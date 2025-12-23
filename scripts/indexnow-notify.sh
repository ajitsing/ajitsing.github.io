#!/bin/bash
# IndexNow Notification Script for Bing/Yandex
# 
# Usage: 
#   ./scripts/indexnow-notify.sh https://singhajit.com/new-post-url/
#   ./scripts/indexnow-notify.sh https://singhajit.com/post1/ https://singhajit.com/post2/
#
# This script notifies Bing and Yandex about new or updated content via IndexNow protocol

HOST="singhajit.com"
KEY="c7cba40954d441c6866b7aa29ed5c8d6"
KEY_LOCATION="https://singhajit.com/${KEY}.txt"

# Check if URLs are provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <url1> [url2] [url3] ..."
    echo "Example: $0 https://singhajit.com/my-new-post/"
    exit 1
fi

# Build URL list for JSON
URL_LIST=""
for url in "$@"; do
    if [ -n "$URL_LIST" ]; then
        URL_LIST="$URL_LIST,"
    fi
    URL_LIST="$URL_LIST\"$url\""
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

echo "Notifying IndexNow about URL(s): $@"
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

echo ""
echo "Done! Status codes:"
echo "  200 = URL submitted successfully"
echo "  202 = URL received, pending key validation"
echo "  400 = Invalid request"
echo "  403 = Key not valid"
echo "  422 = URLs don't belong to the host"
echo "  429 = Too many requests"

