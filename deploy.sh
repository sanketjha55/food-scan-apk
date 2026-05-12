#!/bin/bash
# Automated GitHub Repo Creation & Push Script
# Usage: bash deploy.sh YOUR_GITHUB_TOKEN

GITHUB_TOKEN=$1
GITHUB_USER=$2
REPO_NAME="food-scanner-app"

if [ -z "$GITHUB_TOKEN" ] || [ -z "$GITHUB_USER" ]; then
  echo "Usage: bash deploy.sh YOUR_GITHUB_TOKEN YOUR_GITHUB_USERNAME"
  echo ""
  echo "Get your token from: https://github.com/settings/tokens"
  echo "Generate: Personal access tokens (classic)"
  echo "Scopes needed: repo (all)"
  exit 1
fi

echo "🚀 Creating GitHub repository..."

# Create repo via GitHub API
curl -X POST https://api.github.com/user/repos \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"$REPO_NAME\",
    \"description\": \"AI-powered food scanner app with deep research\",
    \"private\": false,
    \"auto_init\": false
  }"

echo ""
echo "✅ Repository created!"
echo ""
echo "Pushing code to GitHub..."

# Configure git
git config user.name "GitHub Actions"
git config user.email "actions@github.com"

# Add remote and push
git remote add origin https://$GITHUB_USER:$GITHUB_TOKEN@github.com/$GITHUB_USER/$REPO_NAME.git
git branch -M main
git push -u origin main

echo ""
echo "✅ Code pushed successfully!"
echo ""
echo "🎉 Visit: https://github.com/$GITHUB_USER/$REPO_NAME"
echo "⏳ Build will start automatically in GitHub Actions..."
