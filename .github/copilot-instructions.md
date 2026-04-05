# Task Manager Project - Copilot Instructions

## Project Setup Checklist

- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Create project structure (Backend + Frontend)
- [x] Set up Backend (Python/FastAPI)
- [x] Set up Frontend (React)
- [x] Complete application development
- [ ] Install dependencies (run setup.bat or setup.sh)
- [ ] Run and test the project

## Project Overview

Full-stack task management web application:
- **Backend**: Python FastAPI with REST API
- **Frontend**: React with modern UI with gradient backgrounds and animations
- **Database**: JSON file storage
- **Features**: Tasks with priority, due dates, filtering, responsive design

## Quick Start

### Windows
Run the setup script:
```bash
setup.bat
```

### macOS/Linux
```bash
bash setup.sh
```

### Manual Setup

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## Features Implemented

✅ React frontend with modern UI
✅ FastAPI backend with REST API
✅ Task CRUD operations
✅ Task filtering (All, Active, Completed)
✅ Priority levels with color coding
✅ Due date management
✅ Task descriptions
✅ Task completion toggle
✅ Responsive design
✅ Gradient backgrounds and animations
✅ Local storage backup
✅ Task statistics
✅ Edit functionality
✅ CORS enabled

## API Endpoints

- GET /api/tasks - Get all tasks
- POST /api/tasks - Create task
- PUT /api/tasks/{id} - Update task
- DELETE /api/tasks/{id} - Delete task
- POST /api/tasks/{id}/toggle - Toggle completion
- GET /api/stats - Get statistics

