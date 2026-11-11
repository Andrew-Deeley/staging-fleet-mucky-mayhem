# Client deployment setup

**Updated direction:** [Production on its GitHub Pages address](production-github-preview.md) describes the approved GitHub-only production candidate. The initial empty-production hold below is historical once that candidate is published; custom-domain cutover remains separately disabled.

## Initial setup record

Owner: Andrew-Deeley. Developer: Martin-Ferrero-Thompson. During setup Martin retains his own Git author name/email. Andy observes through the public source repository and preview. Account-owner access is always full control; observer status is an agreement, not a restricted owner role.

## Paths and branches

Source: Andrew-Deeley/staging-fleet-mucky-mayhem. Default branch staging; approved source branch production. Generated production: Andrew-Deeley/fleet-mucky-mayhem, main after the first authorised publication. The production repository remains empty until then so its history contains only real publication commits.

The staging workflow builds/tests source and deploys a Pages artifact directly from staging. No generated branch or third repository is needed. The github-pages environment permits staging only. The preview is https://andrew-deeley.github.io/staging-fleet-mucky-mayhem/ with no custom domain and noindex, nofollow.

## Production hold

FMM_PRODUCTION_ENABLED is false. FMM_PRODUCTION_DOMAIN is unset. The production workflow cannot publish until both gates are deliberately configured after separate launch authorisation. The existing IONOS deployment, DNS, email, certificates and redirects remain untouched.

A dedicated write deploy key grants only the production publishing repository access. Store its private half only in the source repository production-environment Actions secret FMM_PRODUCTION_DEPLOY_KEY; never commit it. The production environment permits only the production branch. Missing configuration must fail closed.

The release workflow tests/builds source, prepares root-domain output, records package.json version and source SHA, and writes a generated commit named vX.Y.Z Published to the publishing repository. It adds CNAME only to generated output during an authorised production run. Retrying the same source/build is idempotent; changed source must use a new version. Source commits and approvals never belong in the publishing repository.

## Required checks and owner setup

Protect permanent source branches against deletion and force pushes. Require pull requests and Check, test and build from GitHub Actions (provider 15368). Staging needs no formal approval; production needs one independent approving review once operational. Use merge commits into production for the planned undo route. Avoid claiming approval alone starts publication: merging production starts it only when the production gate is enabled.

Martin works through his own collaborator account. Owner-only settings and scoped deployment credentials are recorded separately in the setup evidence. A read-only observer cannot supply a qualifying required approval; Andy must have operational access by release time. Both owner and collaborator can technically merge eligible PRs; intended client-only release merging is a procedural commitment in a personal repository.

## Go-live checkpoint and recovery

Setup/acceptance history is provisional and is retained outside the client repositories at go-live. Obtain approval of the exact tested source before a one-time clean baseline operation. Coordinate existing clones, tags, PRs, checks, branch rules and workflow version evidence; do not rewrite history as part of normal publication. Source staging/production begin from the same approved initial commit. Production begins with the first actual publication commit. Keep subsequent source and publication history.

Rehearse release and undo at an isolated destination before enabling production. Confirm independent reviewers and who merges. Record the approved version/source and published source SHA. A GitHub revert creates a new checked PR and can require developer help; test the recovery procedure rather than promising a one-click recovery. Domain cutover and old-site recovery require a separately approved plan.

Production Pages custom domain, HTTPS and bare/www redirects are launch work. Because there are no production files before launch, its main branch and branch-based Pages source can only be activated after the first authorised publishing commit. Do not add a README/setup commit to that repository merely to create a branch.

Two audience-specific editing guides remain to be finalised after ratifying the release process. Historical code-walkthrough documents are code references, not current deployment instructions.
