$maxAttempts = 20
$attemptCount = 0

Write-Host "Starting build monitor..." -ForegroundColor Cyan
Write-Host ""

while ($attemptCount -lt $maxAttempts) {
  try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/repos/sanketjha55/food-scan-apk/actions/runs" -ErrorAction SilentlyContinue
    $latest = $response.workflow_runs[0]
    $status = $latest.status
    $conclusion = $latest.conclusion
    $buildId = $latest.id
    
    $time = Get-Date -Format "HH:mm:ss"
    Write-Host "[$time] Build: $buildId | Status: $status | Result: $conclusion" -ForegroundColor Cyan
    
    if ($status -eq "completed") {
      Write-Host ""
      if ($conclusion -eq "success") {
        Write-Host "SUCCESS! APK is ready!" -ForegroundColor Green
        Write-Host "Download from: https://github.com/sanketjha55/food-scan-apk/releases" -ForegroundColor Yellow
      } else {
        Write-Host "BUILD FAILED! Conclusion: $conclusion" -ForegroundColor Red
        Write-Host "Check logs: https://github.com/sanketjha55/food-scan-apk/actions/runs/$buildId" -ForegroundColor Yellow
      }
      break
    }
  } catch {
    Write-Host "Error checking: $_" -ForegroundColor Yellow
  }
  
  $attemptCount++
  if ($attemptCount -lt $maxAttempts) {
    Start-Sleep -Seconds 30
  }
}

if ($attemptCount -ge $maxAttempts) {
  Write-Host ""
  Write-Host "Monitor timeout - build still running" -ForegroundColor Yellow
  Write-Host "Check: https://github.com/sanketjha55/food-scan-apk/actions" -ForegroundColor Cyan
}
