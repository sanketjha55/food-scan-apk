param(
    [string]$GitHubToken,
    [string]$GitHubUser
)

$RepoName = "food-scanner-app"
$RepoUrl = "https://github.com/$GitHubUser/$RepoName"

Write-Host "🚀 Creating GitHub repository..." -ForegroundColor Cyan

# Create repo via GitHub API
$Body = @{
    name = $RepoName
    description = "AI-powered food scanner app"
    private = $false
} | ConvertTo-Json

try {
    $Response = Invoke-RestMethod `
        -Uri "https://api.github.com/user/repos" `
        -Method Post `
        -Headers @{ Authorization = "token $GitHubToken"; "Content-Type" = "application/json" } `
        -Body $Body
    Write-Host "✅ Repository created!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Repository may already exist" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📤 Pushing code to GitHub..." -ForegroundColor Cyan

git config user.name "Food Scanner Builder"
git config user.email "builder@foodscanner.app"
git remote remove origin 2>$null

$remoteUrl = "https://$($GitHubUser):$($GitHubToken)@github.com/$($GitHubUser)/$($RepoName).git"
git remote add origin $remoteUrl

git branch -M main
git push -u origin main

Write-Host ""
Write-Host "✅ Done!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Visit: $RepoUrl" -ForegroundColor Cyan
Write-Host "🔨 Build: $RepoUrl/actions" -ForegroundColor Cyan
Write-Host "📥 Download APK in 15 min: $RepoUrl/releases" -ForegroundColor Cyan
