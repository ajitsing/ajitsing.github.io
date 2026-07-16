#!/usr/bin/env bash
# Purge unused Bootstrap CSS from _site, then rebuild critical CSS bundles.
# Intended to run after `jekyll build` and before CSS minify in CI.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SITE="${ROOT}/_site"
VENDOR_CSS="${SITE}/assets/vendor/bootstrap-4.4.1.min.css"
CSS_DIR="${SITE}/assets/css"
MAIN_CSS="${CSS_DIR}/main.css"
POST_LAYOUT_CSS="${CSS_DIR}/post-layout.css"
SIDEBAR_CSS="${CSS_DIR}/sidebar.css"
SITE_CRITICAL="${CSS_DIR}/site-critical.css"
POST_CRITICAL="${CSS_DIR}/post-critical.css"
PURGE_OUT="${SITE}/assets/vendor"

for path in "$VENDOR_CSS" "$MAIN_CSS" "$POST_LAYOUT_CSS" "$SIDEBAR_CSS"; do
  if [[ ! -f "$path" ]]; then
    echo "purge-bootstrap-css: missing ${path}" >&2
    exit 1
  fi
done

before_bytes="$(wc -c < "$VENDOR_CSS" | tr -d ' ')"

npx --yes purgecss@6.0.0 \
  --css "$VENDOR_CSS" \
  --content "${SITE}/**/*.html" \
  --safelist show collapsing collapse fade active disabled \
  --output "$PURGE_OUT"

after_bytes="$(wc -c < "$VENDOR_CSS" | tr -d ' ')"
echo "purge-bootstrap-css: Bootstrap ${before_bytes} -> ${after_bytes} bytes"

cat "$VENDOR_CSS" "$MAIN_CSS" > "$SITE_CRITICAL"
cat "$VENDOR_CSS" "$MAIN_CSS" "$POST_LAYOUT_CSS" "$SIDEBAR_CSS" > "$POST_CRITICAL"

echo "purge-bootstrap-css: rebuilt site-critical.css and post-critical.css"
