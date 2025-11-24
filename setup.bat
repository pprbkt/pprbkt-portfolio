@echo off
echo.
echo ================================
echo  Dhanush HS Portfolio Setup
echo ================================
echo.

echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ❌ Failed to install dependencies
    echo Please make sure you have Node.js installed
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully!
echo.
echo Starting development server...
echo The website will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
