# ECE MATLAB Helper - Backend Startup Script
# This script activates the virtual environment and starts the Flask server

Write-Host "Starting ECE MATLAB Helper Backend..." -ForegroundColor Green
Write-Host "Activating virtual environment..." -ForegroundColor Yellow

Set-Location $PSScriptRoot

# Start Flask using the virtual environment's Python
& .\venv\Scripts\python.exe app.py
