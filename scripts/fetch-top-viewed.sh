#!/usr/bin/env bash
# Writes _data/top_viewed.yml from GoatCounter (last 15 days). Needs GOAT_COUNTER.
# Fails the deploy on missing token, network errors, or unexpected API responses.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${ROOT}/_data/top_viewed.yml"
API="https://singhajit.goatcounter.com/api/v0"
WINDOW_DAYS=15
TARGET_POSTS=20
PAGE_LIMIT=50

die() {
  echo "fetch-top-viewed: $*" >&2
  exit 1
}

if [ -z "${GOAT_COUNTER:-}" ]; then
  die "GOAT_COUNTER secret is required"
fi

if date -u -d '15 days ago' +%Y-%m-%dT00:00:00Z >/dev/null 2>&1; then
  START=$(date -u -d "${WINDOW_DAYS} days ago" +%Y-%m-%dT00:00:00Z)
else
  START=$(date -u -v-${WINDOW_DAYS}d +%Y-%m-%dT00:00:00Z)
fi
END=$(date -u +%Y-%m-%dT23:59:59Z)
UPDATED_AT=$(date -u +%Y-%m-%dT%H:%M:%SZ)

EXCLUDE_RE='^/$|^/tools(/|$)|^/glossary(/|$)|^/explainer(/|$)|^/archive(/|$)|^/privacy|^/tags(/|$)|^/assets/|^/feed|^/search|^/css/|^/js/|^/img/|^/fonts/'

TMP_ALL=$(mktemp)
TMP_KEPT=$(mktemp)
trap 'rm -f "$TMP_ALL" "$TMP_KEPT"' EXIT

: > "$TMP_ALL"
EXCLUDE_IDS=()
PAGES=0
MAX_PAGES=5

while [ "$PAGES" -lt "$MAX_PAGES" ]; do
  PAGES=$((PAGES + 1))

  CURL_ARGS=(
    -sS -f -G "${API}/stats/hits"
    --data-urlencode "start=${START}"
    --data-urlencode "end=${END}"
    --data-urlencode "limit=${PAGE_LIMIT}"
    -H "Content-Type: application/json"
    -H "Authorization: Bearer ${GOAT_COUNTER}"
  )
  for id in "${EXCLUDE_IDS[@]+"${EXCLUDE_IDS[@]}"}"; do
    CURL_ARGS+=(--data-urlencode "exclude_paths=${id}")
  done

  if ! RESP=$(curl "${CURL_ARGS[@]}"); then
    die "GoatCounter API request failed"
  fi

  if ! echo "$RESP" | jq -e 'type == "object" and has("hits")' >/dev/null 2>&1; then
    echo "$RESP" | head -c 400 >&2
    echo >&2
    die "unexpected GoatCounter API response"
  fi

  HIT_COUNT=$(echo "$RESP" | jq '.hits | length')
  if [ "$HIT_COUNT" -eq 0 ]; then
    break
  fi

  echo "$RESP" | jq -c '.hits[]' >> "$TMP_ALL"

  while IFS= read -r id; do
    [ -n "$id" ] && EXCLUDE_IDS+=("$id")
  done < <(echo "$RESP" | jq -r '.hits[].path_id // empty')

  KEPT_SO_FAR=$(jq -s --arg re "$EXCLUDE_RE" \
    '[.[] | select(.path != null) | select(.path | test($re) | not)] | length' \
    "$TMP_ALL")

  if [ "$KEPT_SO_FAR" -ge "$TARGET_POSTS" ] || [ "$HIT_COUNT" -lt "$PAGE_LIMIT" ]; then
    break
  fi
done

jq -s --arg re "$EXCLUDE_RE" --argjson n "$TARGET_POSTS" \
  '[.[] | select(.path != null) | select(.path | test($re) | not)] | .[:$n] | map({path, count})' \
  "$TMP_ALL" > "$TMP_KEPT"

POST_COUNT=$(jq 'length' "$TMP_KEPT")
if [ "$POST_COUNT" -eq 0 ]; then
  die "no blog posts found in GoatCounter hits for the last ${WINDOW_DAYS} days"
fi

{
  echo "updated_at: \"${UPDATED_AT}\""
  echo "window_days: ${WINDOW_DAYS}"
  echo "posts:"
  jq -r '.[] | "  - path: \"\(.path | gsub("\""; "\\\""))\"\n    count: \(.count)"' "$TMP_KEPT"
} > "$OUT"

echo "fetch-top-viewed: wrote ${POST_COUNT} posts (${START} → ${END}) to ${OUT}"
