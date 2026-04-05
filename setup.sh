#!/bin/bash

echo ""
echo "Task Manager - Full Stack Application"
echo "====================================="
echo ""
echo "This script will help you set up and run the Task Manager."
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python is not installed. Please install Python first."
    exit 1
fi

echo "Checking Python version..."
python3 --version

echo ""
echo "Setting up Backend..."
echo "===================="

cd backend
echo "Creating virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo ""
echo "Backend is ready! To start the backend server:"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python -m uvicorn app.main:app --reload"
echo ""

cd ..

echo "Setting up Frontend..."
echo "====================="

cd frontend
echo "Installing Node dependencies..."
npm install

echo ""
echo "Frontend is ready! To start the frontend dev server:"
echo "  cd frontend"
echo "  npm start"
echo ""

cd ..

echo ""
echo "Setup Complete!"
echo "==============="
echo ""
echo "To run the application:"
echo ""
echo "1. Terminal 1 - Start Backend:"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python -m uvicorn app.main:app --reload"
echo ""
echo "2. Terminal 2 - Start Frontend:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "The application will be available at http://localhost:3000"
echo "API docs will be at http://localhost:8000/docs"
echo ""
