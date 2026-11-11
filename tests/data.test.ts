import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadRideData, parseRideData } from '../src/lib/data.ts';
const read = (file: string): unknown => JSON.parse(readFileSync(new URL(`../public/data/${file}`, import.meta.url), 'utf8'));
// Synthetic rides keep schema tests independent of editorial changes and archive order.
const fixture = (): import('../src/lib/data.ts').RideData => ({
  programmeYear: 2026,
  longerRides: [{
    id: 'sample-current', title: 'Sample ride', date: '2026-06-14', year: 2026,
    startTime: '09:30', meetPoint: { name: 'Sample meeting point', googleMapsUrl: 'https://example.com/meeting-point' },
    destination: 'Sample cafe', distanceMiles: 30, overallTime: '5 hours', rideTime: '3 hours',
    routeMapImage: 'img/ride-maps/sample.png', photosUrl: 'https://example.com/photos',
    reliveUrl: 'https://example.com/recording', guidance: 'Bring water.', notes: ['A sample report.'],
  }],
  archivedRides: [{
    id: 'sample-archive', title: 'Earlier sample', date: '2025-06-15', year: 2025,
    meetPoint: { name: 'Earlier meeting point' },
  }],
});
test('published ride data satisfies the runtime schema without fixing editorial content', () => {
  assert.doesNotThrow(() => parseRideData(read('longer-rides.json')));
});
test('valid editorial updates, additions, removals and annual rollover are accepted', () => {
  const data = fixture();
  data.longerRides[0]!.title = 'Updated destination';
  data.longerRides[0]!.notes = ['Updated report.'];
  data.longerRides.push({ ...structuredClone(data.longerRides[0]!), id: 'additional-ride' });
  assert.equal(parseRideData(data).longerRides.length, 2);
  data.archivedRides.push(...data.longerRides);
  data.longerRides = [];
  data.programmeYear = 2028;
  assert.equal(parseRideData(data).archivedRides.length, 3);
  data.longerRides.push({
    id: 'new-programme-ride', title: 'New programme', date: '2028-05-14', year: 2028,
    meetPoint: { name: 'New meeting point' },
  });
  assert.equal(parseRideData(data).longerRides[0]!.year, 2028);
  data.archivedRides = [];
  assert.equal(parseRideData(data).archivedRides.length, 0);
  data.longerRides = [];
  assert.doesNotThrow(() => parseRideData(data));
});
test('ride schema rejects malformed dates, IDs, years, times, fields, and distance', () => {
  for (const corrupt of [
    (data: ReturnType<typeof fixture>) => { data.longerRides[0]!.date = '2026-02-30'; },
    (data: ReturnType<typeof fixture>) => { data.longerRides[0]!.startTime = '24:30'; },
    (data: ReturnType<typeof fixture>) => { data.longerRides[0]!.year = 2025; },
    (data: ReturnType<typeof fixture>) => { data.longerRides[0]!.distanceMiles = -1; },
    (data: ReturnType<typeof fixture>) => { data.longerRides[0]!.meetPoint.name = ''; },
    (data: ReturnType<typeof fixture>) => { data.longerRides.push(data.longerRides[0]!); },
  ]) { const data = fixture(); corrupt(data); assert.throws(() => parseRideData(data)); }
  assert.throws(() => parseRideData({ longerRides: [], archivedRides: 'not an array' }));
});
test('TBD dates and missing start times are accepted explicitly', () => {
  const data = fixture(); data.longerRides[0]!.date = null; delete data.longerRides[0]!.startTime;
  assert.equal(parseRideData(data).longerRides[0]!.date, null);
});
test('cycling-time estimates are optional and must be nonempty text when supplied', () => {
  const data = fixture();
  delete data.longerRides[0]!.rideTime;
  assert.equal(parseRideData(data).longerRides[0]!.rideTime, undefined);
  data.longerRides[0]!.rideTime = '2-3 hours';
  assert.equal(parseRideData(data).longerRides[0]!.rideTime, '2-3 hours');
  for (const invalid of ['', '   ', null, 3, ['2 hours']]) {
    const malformed = structuredClone(data) as unknown as { longerRides: Record<string, unknown>[] };
    malformed.longerRides[0]!.rideTime = invalid;
    assert.throws(() => parseRideData(malformed), /rideTime/);
  }
});
test('ride schema still rejects missing dates, meet points, and malformed notes', () => {
  for (const corrupt of [
    (ride: Record<string, unknown>) => { delete ride.date; },
    (ride: Record<string, unknown>) => { delete ride.meetPoint; },
    (ride: Record<string, unknown>) => { ride.notes = [42]; },
  ]) {
    const data = fixture() as unknown as { longerRides: Record<string, unknown>[] };
    corrupt(data.longerRides[0]!);
    assert.throws(() => parseRideData(data));
  }
});
test('historical single-item URL arrays normalize without mutating source JSON', () => {
  const source = fixture() as unknown as { longerRides: Record<string, unknown>[]; archivedRides: Record<string, unknown>[] };
  for (const field of ['routeMapImage', 'photosUrl', 'reliveUrl']) {
    source.longerRides[0]![field] = [source.longerRides[0]![field]];
  }
  source.archivedRides[0]!.routeMapImage = ['img/ride-maps/archive.png'];
  const original = structuredClone(source);
  const parsed = parseRideData(source);
  assert.equal(parsed.longerRides[0]!.routeMapImage, 'img/ride-maps/sample.png');
  assert.equal(parsed.longerRides[0]!.photosUrl, 'https://example.com/photos');
  assert.equal(parsed.longerRides[0]!.reliveUrl, 'https://example.com/recording');
  assert.equal(parsed.archivedRides[0]!.routeMapImage, 'img/ride-maps/archive.png');
  assert.deepEqual(source, original, 'Parsing must preserve the original legacy arrays');
  const invalid = fixture() as unknown as { longerRides: Record<string, unknown>[] };
  invalid.longerRides[0]!.photosUrl = ['one', 'two'];
  assert.throws(() => parseRideData(invalid));
});
test('concurrent ride consumers share a validated request; failed requests can retry', async () => {
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response('{}', { status: 503 }); };
  try {
    await assert.rejects(Promise.all([loadRideData(), loadRideData()]), /503/);
    assert.equal(calls, 1);
    globalThis.fetch = async () => { calls++; return Response.json(fixture()); };
    const [first, second] = await Promise.all([loadRideData(), loadRideData()]);
    assert.equal(calls, 2); assert.equal(first, second);
  } finally { globalThis.fetch = original; }
});

test('programme year is optional for legacy data and validated when supplied', () => {
  assert.doesNotThrow(() => parseRideData({ longerRides: [], archivedRides: [] }));
  for (const programmeYear of ['2027', null, 0, -1, 2027.5]) {
    assert.throws(() => parseRideData({ programmeYear, longerRides: [], archivedRides: [] }), /programmeYear/);
  }
});

test('ride links reject invalid schemes and map paths while preserving legacy URL arrays', () => {
  for (const field of ['photosUrl', 'reliveUrl']) {
    for (const invalid of ['javascript:alert(1)', 'http://example.com/album', 'not a URL']) {
      const data = fixture();
      (data.longerRides[0] as unknown as Record<string, unknown>)[field] = invalid;
      assert.throws(() => parseRideData(data), /HTTPS URL/);
    }
  }
  const data = fixture();
  data.longerRides[0]!.meetPoint.googleMapsUrl = 'javascript:alert(1)';
  assert.throws(() => parseRideData(data), /HTTPS URL/);
  for (const invalid of ['../secret.png', 'https://example.com/map.png', 'img/ride-maps/../map.png']) {
    const data = fixture();
    data.longerRides[0]!.routeMapImage = invalid;
    assert.throws(() => parseRideData(data), /routeMapImage/);
  }
  const legacy = fixture() as unknown as { longerRides: Record<string, unknown>[] };
  legacy.longerRides[0]!.photosUrl = ['https://example.com/photos'];
  assert.equal(parseRideData(legacy).longerRides[0]!.photosUrl, 'https://example.com/photos');
});
