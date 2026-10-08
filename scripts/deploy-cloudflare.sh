#!/usr/bin/env bash
# Build for the custom domain and publish to Cloudflare Pages.
# Usage: npm run deploy:cf   (run `npx wrangler login` once first)
set -euo pipefail
cd "$(dirname "$0")/.."
PROJECT="${CF_PAGES_PROJECT:-hallco-special-olympics}"
export NEXT_PUBLIC_BASE_PATH=""
export NEXT_PUBLIC_SITE_URL="${SITE_URL:-https://olympics.agapelabs.net}"
echo "Building for $NEXT_PUBLIC_SITE_URL"
npm run build
npx wrangler pages deploy out --project-name "$PROJECT" --branch main --commit-dirty=true
