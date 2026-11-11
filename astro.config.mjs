import { defineConfig } from 'astro/config';
const staging = process.env.FMM_STAGING === '1';
const productionPreview = process.env.FMM_PRODUCTION_PREVIEW === '1';
if (staging && productionPreview) throw new Error('Choose one preview build target.');
export default defineConfig({
  output: 'static', compressHTML: false, devToolbar: { enabled: false },
  ...(staging ? {
    site: process.env.FMM_STAGING_SITE || 'https://andrew-deeley.github.io',
    base: '/staging-fleet-mucky-mayhem',
    outDir: './artifacts/staging-site',
  } : productionPreview ? {
    site: 'https://andrew-deeley.github.io',
    base: '/fleet-mucky-mayhem',
    outDir: './artifacts/production-site',
  } : {}),
});
