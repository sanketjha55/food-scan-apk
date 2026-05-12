#!/bin/bash
# Build Monitoring Script
# This script monitors the GitHub Actions build and checks for issues

REPO="sanketjha55/food-scan-apk"
ACTIONS_URL="https://api.github.com/repos/$REPO/actions/runs"

echo "🔍 Monitoring build status..."
echo ""

# Get latest build
LATEST_BUILD=$(curl -s $ACTIONS_URL | jq -r '.workflow_runs[0]')
BUILD_ID=$(echo $LATEST_BUILD | jq -r '.id')
BUILD_STATUS=$(echo $LATEST_BUILD | jq -r '.status')
BUILD_CONCLUSION=$(echo $LATEST_BUILD | jq -r '.conclusion')

echo "Build ID: $BUILD_ID"
echo "Status: $BUILD_STATUS"
echo "Conclusion: $BUILD_CONCLUSION"
echo ""

if [ "$BUILD_STATUS" = "completed" ]; then
  if [ "$BUILD_CONCLUSION" = "success" ]; then
    echo "✅ BUILD SUCCESSFUL!"
    echo "APK Ready to download from:"
    echo "https://github.com/$REPO/releases"
  else
    echo "❌ BUILD FAILED"
    echo "Check: https://github.com/$REPO/actions/runs/$BUILD_ID"
  fi
else
  echo "⏳ Build still running..."
  echo "Watch: https://github.com/$REPO/actions/runs/$BUILD_ID"
fi
