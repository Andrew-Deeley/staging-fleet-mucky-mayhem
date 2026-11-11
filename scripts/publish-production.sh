#!/usr/bin/env bash
set -euo pipefail
if [[ "${GITHUB_REPOSITORY:-}" != 'Andrew-Deeley/staging-fleet-mucky-mayhem' || "${GITHUB_REF:-}" != 'refs/heads/production' ]]; then
  echo 'Only the client production source branch may publish.' >&2; exit 1
fi
if [[ -z "${FMM_PRODUCTION_DEPLOY_KEY:-}" ]]; then echo 'Missing dedicated production publishing key.' >&2; exit 1; fi
case "${FMM_PUBLISH_TARGET:-}" in
  github-pages) build="$PWD/artifacts/production-site" ;;
  custom-domain) build="$PWD/dist" ;;
  *) echo 'Choose an explicit publication target.' >&2; exit 1 ;;
esac
test -f "$build/index.html"
test -f "$build/release-version.json"
if [[ "$FMM_PUBLISH_TARGET" == github-pages ]]; then
  test ! -e "$build/CNAME"
else
  test "${FMM_DOMAIN_CUTOVER_ENABLED:-}" = true
  test "${FMM_PRODUCTION_DOMAIN:-}" = fleetmuckymayhem.com
  test "$(cat "$build/CNAME")" = fleetmuckymayhem.com
fi
export FMM_RELEASE_MANIFEST="$build/release-version.json"
version=$(node --input-type=module -e 'import {readFileSync} from "node:fs"; const release=JSON.parse(readFileSync(process.env.FMM_RELEASE_MANIFEST)); if(release.source!==process.env.GITHUB_SHA || release.target!==process.env.FMM_PUBLISH_TARGET || !/^v[0-9]+\.[0-9]+\.[0-9]+$/.test(release.version)) throw new Error("Release metadata does not match this publication"); console.log(release.version);')
umask 077
key_file=$(mktemp)
hosts_file=$(mktemp)
trap 'rm -f "$key_file" "$hosts_file"' EXIT
printf '%s\n' "$FMM_PRODUCTION_DEPLOY_KEY" > "$key_file"
unset FMM_PRODUCTION_DEPLOY_KEY
printf '%s\n' 'github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl' > "$hosts_file"
export GIT_SSH_COMMAND="ssh -i '$key_file' -o IdentitiesOnly=yes -o BatchMode=yes -o StrictHostKeyChecking=yes -o UserKnownHostsFile='$hosts_file'"
export GIT_TERMINAL_PROMPT=0
publish_dir=$(mktemp -d)
git clone --no-checkout git@github.com:Andrew-Deeley/fleet-mucky-mayhem.git "$publish_dir"
if git -C "$publish_dir" show-ref --verify --quiet refs/remotes/origin/main; then
  git -C "$publish_dir" checkout -B main origin/main
  if [[ -f "$publish_dir/release-version.json" ]]; then
    node --input-type=module - "$publish_dir/release-version.json" <<'JS'
import {readFileSync} from 'node:fs';
const old = JSON.parse(readFileSync(process.argv[2]));
const next = JSON.parse(readFileSync(process.env.FMM_RELEASE_MANIFEST));
if (old.version === next.version && (old.source !== next.source || old.target !== next.target)) throw new Error('Increment the release version before publishing changed source.');
JS
  fi
else
  git -C "$publish_dir" checkout --orphan main
fi
rsync -a --checksum --delete --exclude='.git/' "$build/" "$publish_dir/"
git -C "$publish_dir" add --all
if git -C "$publish_dir" diff --cached --quiet; then echo 'This release is already current.'; exit 0; fi
git -C "$publish_dir" -c user.name='github-actions[bot]' -c user.email='41898282+github-actions[bot]@users.noreply.github.com' commit -m "$version Published"
git -C "$publish_dir" push origin HEAD:main
