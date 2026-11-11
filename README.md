# Fleet Mucky Mayhem

Website source and staging preview for the Fleet Mucky Mayhem cycling group.

## Repository layout

| Repository | Permanent branches | Purpose |
| --- | --- | --- |
| Andrew-Deeley/staging-fleet-mucky-mayhem | staging, production | Editable source, checks, approvals and the preview |
| Andrew-Deeley/fleet-mucky-mayhem | main, once first published | Generated release files only |

Staging preview: https://andrew-deeley.github.io/staging-fleet-mucky-mayhem/

The preview is public and asks search engines not to index it. It is not access restricted.
Production domain, after separately authorised launch: https://fleetmuckymayhem.com/

## Current phase

Pre-launch setup and remote acceptance. Production publishing is disabled. The existing IONOS website remains live. Setup history is provisional: at separately authorised go-live, preserve it outside these client repositories and establish one approved source baseline. After go-live retain source commits normally. Production history contains publication commits only. Do not rewrite history as part of routine releases.

Martin develops through his own GitHub account and authors his own commits. Andy observes for now; the owner account has full owner permissions whenever used. Final release ownership and operating guides will be confirmed during handover.

## Local commands

Use Node 24 (tested with 24.22.1) and npm 11.19.1 in Linux/WSL.

```bash
npm ci
npm test
npm run check
npm run build
npm run build:staging
npm run dev
```

Longer Rides: `public/data/longer-rides.json`. Section content: `src/components/*.astro`. Photos: `public/data/photos.json`. Application output is generated; edit source, not built files.

The existing code walkthrough is under `docs/website-code-walkthrough/`. Machine/account examples there may describe earlier development; use the deployment record below for the current destination.

See [deployment setup](docs/client-handover/deployment-setup.md) for controls, release preparation and go-live work still pending. The two audience-specific editing guides will follow the ratified workflow.
