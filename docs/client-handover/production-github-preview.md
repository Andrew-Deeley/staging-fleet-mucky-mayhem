# Production candidate on GitHub Pages

Approved direction, 11 November 2026: publish the production candidate at https://andrew-deeley.github.io/fleet-mucky-mayhem/ before handover. The existing IONOS website and domain/DNS remain unchanged. Both preview sites ask search engines not to index them.

Source staging retains development history; source production records approved releases. The generated repository main receives publication commits only. The first candidate is v2.0.0 Published. Pre-launch source/publication history is provisional until the separately authorised clean baseline at go-live.

For this phase set FMM_PUBLISH_TARGET=github-pages and FMM_PRODUCTION_ENABLED=true only after the tested changes reach production through its required review. Keep FMM_DOMAIN_CUTOVER_ENABLED=false and FMM_PRODUCTION_DOMAIN unset. The new build:production-preview command creates artifacts/production-site with the /fleet-mucky-mayhem/ prefix. Release preparation refuses CNAME in that output. The deployment key remains restricted to the production environment and generated repository.

After the first publication, enable generated repository Pages from main at /(root), leaving Custom domain empty. Verify release-version.json against the approved production source SHA and check assets, ride data and interactions at the published path.

For later custom-domain launch: separately authorise and plan the IONOS changes, rebuild for root-domain output, set FMM_PUBLISH_TARGET=custom-domain, explicitly enable FMM_DOMAIN_CUTOVER_ENABLED and set FMM_PRODUCTION_DOMAIN=fleetmuckymayhem.com. This phase does not authorise those changes. The agreed go-live history baseline and any necessary release-version change must be coordinated before publication.

The production branch still requires one approving review from an eligible account other than the PR author. Keep that gate in place. The developer prepares the change and checks; the current human owner-controller performs the release review. No Andy review should be recorded unless Andy actually performs it.

This document supersedes the earlier setup record's empty-production/Pages-inactive statements once the first GitHub-only publication is verified. Earlier domain-cutover restrictions remain in force.
