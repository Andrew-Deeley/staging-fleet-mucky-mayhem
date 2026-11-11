import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
if (!process.env.npm_execpath) throw new Error('Use npm run build:production-preview.');
const result = spawnSync(process.execPath, [process.env.npm_execpath, 'run', 'build'], {
  cwd: fileURLToPath(new URL('../', import.meta.url)),
  env: { ...process.env, FMM_STAGING: '0', FMM_PRODUCTION_PREVIEW: '1' }, stdio: 'inherit',
});
if (result.status !== 0) process.exit(result.status ?? 1);
const html = readFileSync(new URL('../artifacts/production-site/index.html', import.meta.url), 'utf8');
if (!html.includes('noindex, nofollow') || !html.includes('/fleet-mucky-mayhem/_astro/')) throw new Error('Missing production-preview indexing tag or asset prefix.');
console.log('Production preview prepared at artifacts/production-site.');
