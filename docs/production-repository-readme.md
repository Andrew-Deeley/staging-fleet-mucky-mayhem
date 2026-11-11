# Fleet Mucky Mayhem — published website

> [!CAUTION]
> ## DO NOT EDIT ANY FILES IN THIS REPOSITORY
> **Do not edit, upload, rename or delete files here — including this README.**
>
> This repository is maintained automatically by the website release process. Direct changes can be overwritten by the next publication.

## What this repository is for

This is the **production publishing repository** for Fleet Mucky Mayhem. Its `main` branch contains the generated website files, such as HTML, styles, scripts, images and ride data, together with release information. Its commit history records website publications.

**[View the published website]({{WEBSITE_URL}})**

The current version and approved source commit are recorded in [release-version.json](release-version.json).

## Where to make changes

Make all content, ride-data, layout and code changes in the **[staging/source repository](https://github.com/Andrew-Deeley/staging-fleet-mucky-mayhem/tree/staging)**.

The normal route is:

1. Prepare the change in the source repository through `staging`.
2. Check the [staging preview](https://andrew-deeley.github.io/staging-fleet-mucky-mayhem/).
3. Obtain the required release approval and merge the release into the source repository's `production` branch.
4. Let the automated release process update this repository.

If a published change needs correcting or reversing, use that source/release process with developer support. Editing generated files here is not the recovery procedure.

## Maintaining this notice

This README is generated from [docs/production-repository-readme.md in the source repository](https://github.com/Andrew-Deeley/staging-fleet-mucky-mayhem/blob/staging/docs/production-repository-readme.md). Update that source template through the normal review process if this notice needs changing.
