@echo off
echo.
echo Task Manager - Full Stack Application
echo ====================================
echo.
echo This script will help you set up and run the Task Manager.
echo.

REM Check if node is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if python is installed
where python >nul 2>nul
if errorlevel 1 (
    echo ERROR: Python is not installed. Please install Python first.
    pause
    exit /b 1
)

echo Checking Python version...
python --version

echo.
echo Setting up Backend...
echo ====================

cd backend
echo Creating virtual environment...
if not exist venv (
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt

echo.
echo Backend is ready! To start the backend server:
echo   cd backend
echo   venv\Scripts\activate.bat
echo   python -m uvicorn app.main:app --reload
echo.

cd ..

echo Setting up Frontend...
echo ======================

cd frontend
echo Installing Node dependencies...
call npm install

echo.
echo Frontend is ready! To start the frontend dev server:
echo   cd frontend
echo   npm start
echo.

cd ..

echo.
echo Setup Complete!
echo ===============
echo.
echo To run the application:
echo.
echo 1. Terminal 1 - Start Backend:
echo    cd backend
echo    venv\Scripts\activate.bat
echo    python -m uvicorn app.main:app --reload
echo.
echo 2. Terminal 2 - Start Frontend:
echo    cd frontend
echo    npm start
echo.
echo The application will be available at http://localhost:3000
echo API docs will be at http://localhost:8000/docs
echo.
pause
