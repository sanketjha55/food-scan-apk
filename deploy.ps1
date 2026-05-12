# Automated GitHub Repo Creation & Push Script
# Usage: powershell -ExecutionPolicy Bypass -File deploy.ps1 -GitHubToken "YOUR_TOKEN" -GitHubUser "YOUR_USERNAME"

param(
    [string]$GitHubToken,
    [string]$GitHubUser
)

if (-not $GitHubToken -or -not $GitHubUser) {
    Write-Host "❌ Error: Missing parameters" -ForegroundColor Red
    Write-Host ""
    Write-Host "Usage: powershell -ExecutionPolicy Bypass -File deploy.ps1 -GitHubToken 'YOUR_TOKEN' -GitHubUser 'YOUR_USERNAME'"
    Write-Host ""
    Write-Host "📝 Steps to get your token:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://github.com/settings/tokens"
    Write-Host "2. Click: Generate new token (classic)"
    Write-Host "3. Select scopes: repo (all checks)"
    Write-Host "4. Copy token and paste in command above"
    Write-Host ""
    exit 1
}

$RepoName = "food-scanner-app"
$RepoUrl = "https://github.com/$GitHubUser/$RepoName"

Write-Host "🚀 Creating GitHub repository..." -ForegroundColor Cyan
Write-Host ""

# Create repo via GitHub API
$Body = @{
    name = $RepoName
    description = "AI-powered food scanner app with deep research and multi-language support"
    private = $false
    auto_init = $false
} | ConvertTo-Json

$Response = Invoke-RestMethod `
    -Uri "https://api.github.com/user/repos" `
    -Method Post `
    -Headers @{
        Authorization = "token $GitHubToken"
        "Content-Type" = "application/json"
    } `
    -Body $Body `
    -ErrorAction SilentlyContinue

if ($Response.id) {
    Write-Host "✅ Repository created successfully!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Repository may already exist (or error occurred)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📤 Pushing code to GitHub..." -ForegroundColor Cyan

# Configure git
git config user.name "Food Scanner Builder"
git config user.email "builder@foodscanner.app"

# Add remote
$RemoteUrl = "https://$GitHubUser`:$GitHubToken@github.com/$GitHubUser/$RepoName.git"
git remote remove origin 2>$null
git remote add origin $RemoteUrl

# Push
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Code pushed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Your repository is ready!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📍 Visit: $RepoUrl" -ForegroundColor Cyan
    Write-Host "📋 Actions: $RepoUrl/actions" -ForegroundColor Cyan
    Write-Host "⏳ Build will start automatically..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "💾 In 15 minutes, download APK from:" -ForegroundColor Yellow
    Write-Host "   $RepoUrl/releases" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Failed to push code" -ForegroundColor Red
    Write-Host "Please check your token and username" -ForegroundColor Red
}
