# Pre-launch configuration verification

Prepared 11 November 2026 by Martin. This setup is provisional, not the agreed go-live baseline.

- Source default branch: staging; approved-source branch: production.
- Public Pages preview is configured to deploy only from staging.
- Source branches require PRs and Check, test and build; production requires an independent approving review.
- Martin works through his own collaborator account and retains his own commit authorship.
- Production publication is explicitly disabled; its domain variable is unset.
- The generated publishing repository is empty pending the first authorised publication. Its main history is protected against deletion and force pushes.
- The deployment key is scoped to the publishing repository; the private half is restricted to the source production environment.
- Fresh installation, 20 unit tests, Astro diagnostics, root/prefixed builds, workflow lint, isolated publisher tests and both-build browser matrix passed locally.
- GitHub-side checks, Pages deployment and exact deployed-source verification must complete before reporting the preview ready.

The existing development checkout/history and untracked editing-guide draft are preserved. IONOS and domain/DNS settings remain unchanged. At go-live, separately preserve setup history and establish the agreed single initial source baseline; keep subsequent history. Do not reset history during ordinary releases.
