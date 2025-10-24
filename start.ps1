# ECE MATLAB Helper - Complete Startup Script
# This script starts both backend and frontend in separate windows

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  ECE MATLAB Helper - Starting App  " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Start Backend in new window
Write-Host "Starting Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-File", "$PSScriptRoot\backend\start.ps1"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend in new window
Write-Host "Starting Frontend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-File", "$PSScriptRoot\frontend\start.ps1"

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Check the new terminal windows for logs" -ForegroundColor Gray
Write-Host "=====================================" -ForegroundColor Cyan
