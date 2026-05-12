$repo = 'sanketjha55/food-scan-apk'
$apiUrl = "https://api.github.com/repos/$repo/actions/runs"

Write-Host "Checking latest build..." -ForegroundColor Cyan

try {
  $response = Invoke-RestMethod -Uri $apiUrl -ErrorAction Stop
  $latestRun = $response.workflow_runs[0]
  
  $buildId = $latestRun.id
  $status = $latestRun.status
  $conclusion = $latestRun.conclusion
  $createdAt = $latestRun.created_at
  
  Write-Host ""
  Write-Host "Build ID: $buildId"
  Write-Host "Status: $status"
  Write-Host "Conclusion: $conclusion"
  Write-Host "Created: $createdAt"
  Write-Host ""
  
  if ($status -eq 'completed') {
    if ($conclusion -eq 'success') {
      Write-Host "BUILD SUCCESSFUL!" -ForegroundColor Green
      Write-Host "Download APK: https://github.com/$repo/releases" -ForegroundColor Yellow
    } else {
      Write-Host "BUILD FAILED - $conclusion" -ForegroundColor Red
      Write-Host "Check logs: https://github.com/$repo/actions/runs/$buildId" -ForegroundColor Yellow
    }
  } else {
    Write-Host "Build Status: $status" -ForegroundColor Yellow
    Write-Host "Watch: https://github.com/$repo/actions/runs/$buildId" -ForegroundColor Cyan
  }
} catch {
  Write-Host "Error: $_" -ForegroundColor Red
}
