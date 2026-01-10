#!/bin/bash
# IndexNow Notification Script for Bing/Yandex
# 
# Usage: 
#   ./scripts/indexnow-notify.sh _posts/2025-12-22-htmx-guide.md
#   ./scripts/indexnow-notify.sh _posts/post1.md _posts/post2.md
#
# This script reads the permalink from the post's frontmatter and notifies
# Bing and Yandex about new or updated content via IndexNow protocol

HOST="singhajit.com"
KEY="c7cba40954d441c6866b7aa29ed5c8d6"
KEY_LOCATION="https://singhajit.com/${KEY}.txt"

# Check if files are provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <post1.md> [post2.md] [post3.md] ..."
    echo "Example: $0 _posts/2025-12-22-htmx-guide-modern-web-development.md"
    exit 1
fi

# Extract permalink from frontmatter and build URL list
URL_LIST=""
URLS_DISPLAY=""

for file in "$@"; do
    if [ ! -f "$file" ]; then
        echo "Error: File not found: $file"
        exit 1
    fi
    
    # Extract permalink from frontmatter (between --- markers)
    permalink=$(sed -n '/^---$/,/^---$/p' "$file" | grep -E '^permalink:' | sed 's/^permalink:[[:space:]]*//' | tr -d '"' | tr -d "'")
    
    if [ -z "$permalink" ]; then
        echo "Error: No permalink found in frontmatter of: $file"
        exit 1
    fi
    
    # Build full URL
    url="https://${HOST}${permalink}"
    
    # Add to URL list for JSON
    if [ -n "$URL_LIST" ]; then
        URL_LIST="$URL_LIST,"
    fi
    URL_LIST="$URL_LIST\"$url\""
    
    # Add to display list
    if [ -n "$URLS_DISPLAY" ]; then
        URLS_DISPLAY="$URLS_DISPLAY, $url"
    else
        URLS_DISPLAY="$url"
    fi
done

# JSON payload
JSON_PAYLOAD=$(cat <<EOF
{
    "host": "${HOST}",
    "key": "${KEY}",
    "keyLocation": "${KEY_LOCATION}",
    "urlList": [${URL_LIST}]
}
EOF
)

echo "Notifying IndexNow about URL(s): $URLS_DISPLAY"
echo ""

# Notify Bing
echo "Sending to Bing IndexNow..."
BING_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST \
    "https://www.bing.com/indexnow" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d "$JSON_PAYLOAD")

BING_STATUS=$(echo "$BING_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
echo "Bing Response Status: $BING_STATUS"

# Notify Yandex (also supports IndexNow)
echo ""
echo "Sending to Yandex IndexNow..."
YANDEX_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST \
    "https://yandex.com/indexnow" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d "$JSON_PAYLOAD")

YANDEX_STATUS=$(echo "$YANDEX_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
echo "Yandex Response Status: $YANDEX_STATUS"

# Notify Seznam (Czech search engine, supports IndexNow)
echo ""
echo "Sending to Seznam IndexNow..."
SEZNAM_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST \
    "https://search.seznam.cz/indexnow" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d "$JSON_PAYLOAD")

SEZNAM_STATUS=$(echo "$SEZNAM_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
echo "Seznam Response Status: $SEZNAM_STATUS"

# Notify Naver (Korean search engine, supports IndexNow)
echo ""
echo "Sending to Naver IndexNow..."
NAVER_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST \
    "https://searchadvisor.naver.com/indexnow" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d "$JSON_PAYLOAD")

NAVER_STATUS=$(echo "$NAVER_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
echo "Naver Response Status: $NAVER_STATUS"

echo ""
echo "Done! Status codes:"
echo "  200 = URL submitted successfully"
echo "  202 = URL received, pending key validation"
echo "  400 = Invalid request"
echo "  403 = Key not valid"
echo "  422 = URLs don't belong to the host"
echo "  429 = Too many requests"
