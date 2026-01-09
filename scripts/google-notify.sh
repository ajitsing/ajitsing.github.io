#!/bin/bash
# Google PubSubHubbub Notification Script
#
# This script notifies Google's PubSubHubbub hub about feed updates,
# prompting Google to re-fetch and index new content.

FEED_URL="https://singhajit.com/feed.xml"
HUB_URL="https://pubsubhubbub.appspot.com/"

echo "Notifying Google PubSubHubbub hub..."
echo "Feed URL: $FEED_URL"
echo ""

RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$HUB_URL" \
  -d "hub.mode=publish" \
  -d "hub.url=$FEED_URL")

STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
echo "Response Status: $STATUS"

echo ""
echo "Done!"

