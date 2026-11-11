import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const script = fileURLToPath(new URL('../scripts/prepare-production.mjs', import.meta.url));
function fixture(t: import('node:test').TestContext, preview = true) {
  const directory = mkdtempSync(join(tmpdir(), 'fmm-production-test-'));
  t.after(() => rmSync(directory, {recursive:true, force:true}));
  const output = join(directory, preview ? 'artifacts/production-site' : 'dist');
  mkdirSync(output, {recursive:true});
  writeFileSync(join(directory, 'package.json'), JSON.stringify({version:'2.0.0'}));
  writeFileSync(join(output, 'index.html'), preview ? '<meta name="robots" content="noindex, nofollow"><script src="/fleet-mucky-mayhem/_astro/site.js"></script>' : '<script src="/_astro/site.js"></script>');
  const env = {...process.env, GITHUB_SHA:'1'.repeat(40), FMM_PUBLISH_TARGET:preview ? 'github-pages' : 'custom-domain', FMM_DOMAIN_CUTOVER_ENABLED:'', FMM_PRODUCTION_DOMAIN:''};
  return {output, run:(override: Record<string,string> = {}) => spawnSync(process.execPath, [script], {cwd:directory, env:{...env,...override}, encoding:'utf8'})};
}
test('GitHub production preview records its source without binding a custom domain', t => {
  const {output,run} = fixture(t);
  assert.equal(run().status, 0);
  assert.equal(existsSync(join(output,'CNAME')), false);
  assert.deepEqual(JSON.parse(readFileSync(join(output,'release-version.json'),'utf8')), {version:'v2.0.0',source:'1'.repeat(40),target:'github-pages'});
});
test('publication fails closed on ambiguous targets, stale source or custom-domain contamination', t => {
  const {output,run} = fixture(t);
  assert.notEqual(run({FMM_PUBLISH_TARGET:''}).status, 0);
  assert.notEqual(run({GITHUB_SHA:'invalid'}).status, 0);
  writeFileSync(join(output,'CNAME'),'fleetmuckymayhem.com');
  assert.notEqual(run().status, 0);
});
test('custom-domain output needs separate cutover authorisation and the agreed domain', t => {
  const {output,run} = fixture(t,false);
  assert.notEqual(run().status, 0);
  assert.notEqual(run({FMM_DOMAIN_CUTOVER_ENABLED:'true',FMM_PRODUCTION_DOMAIN:'wrong.example'}).status, 0);
  assert.equal(run({FMM_DOMAIN_CUTOVER_ENABLED:'true',FMM_PRODUCTION_DOMAIN:'fleetmuckymayhem.com'}).status, 0);
  assert.equal(readFileSync(join(output,'CNAME'),'utf8'),'fleetmuckymayhem.com\n');
});
