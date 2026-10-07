#!/usr/bin/env bash
# Build the site for GitHub Pages and push the output to the gh-pages branch.
# Usage: npm run deploy
set -euo pipefail
cd "$(dirname "$0")/.."
REPO_NAME=$(basename "$(git rev-parse --show-toplevel)")
OWNER=$(gh repo view --json owner -q .owner.login 2>/dev/null || git remote get-url origin | sed -E 's#.*[:/]([^/]+)/[^/]+(\.git)?$#\1#')
export NEXT_PUBLIC_BASE_PATH="/$REPO_NAME"
export NEXT_PUBLIC_SITE_URL="https://$OWNER.github.io/$REPO_NAME"
echo "Building for $NEXT_PUBLIC_SITE_URL"
npm run build
touch out/.nojekyll
WORKTREE=$(mktemp -d)
git worktree add --detach "$WORKTREE" >/dev/null
cd "$WORKTREE"
git checkout --orphan gh-pages >/dev/null 2>&1
git rm -rfq . >/dev/null 2>&1 || true
cp -R "$OLDPWD/out/." .
git add -A
git -c user.name="deploy" -c user.email="deploy@local" commit -qm "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push -f origin gh-pages
cd "$OLDPWD"
git worktree remove --force "$WORKTREE"
echo "Deployed to $NEXT_PUBLIC_SITE_URL/"
