from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from datetime import datetime
import os

from app.models import Task, TaskCreate, TaskUpdate
from app.database import TaskDatabase

app = FastAPI(title="Task Manager API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
db = TaskDatabase()

@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.get("/api/tasks", response_model=List[Task])
def get_tasks(completed: Optional[bool] = None, priority: Optional[str] = None):
    """Get all tasks with optional filtering"""
    tasks = db.get_all_tasks()
    
    # Filter by completion status
    if completed is not None:
        tasks = [t for t in tasks if t.completed == completed]
    
    # Filter by priority
    if priority:
        tasks = [t for t in tasks if t.priority == priority]
    
    return tasks

@app.post("/api/tasks", response_model=Task)
def create_task(task: TaskCreate):
    """Create a new task"""
    new_task = db.create_task(
        title=task.title,
        description=task.description,
        due_date=task.due_date,
        priority=task.priority
    )
    return new_task

@app.get("/api/tasks/{task_id}", response_model=Task)
def get_task(task_id: str):
    """Get a specific task"""
    task = db.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.put("/api/tasks/{task_id}", response_model=Task)
def update_task(task_id: str, task_update: TaskUpdate):
    """Update an existing task"""
    existing_task = db.get_task(task_id)
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = task_update.dict(exclude_unset=True)
    updated_task = db.update_task(task_id, update_data)
    
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return updated_task

@app.delete("/api/tasks/{task_id}")
def delete_task(task_id: str):
    """Delete a task"""
    success = db.delete_task(task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}

@app.post("/api/tasks/{task_id}/toggle")
def toggle_task_completion(task_id: str):
    """Toggle task completion status"""
    task = db.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    updated_task = db.update_task(task_id, {"completed": not task.completed})
    return updated_task

@app.get("/api/stats")
def get_stats():
    """Get task statistics"""
    tasks = db.get_all_tasks()
    total = len(tasks)
    completed = sum(1 for t in tasks if t.completed)
    active = total - completed
    
    return {
        "total": total,
        "completed": completed,
        "active": active,
        "completion_rate": (completed / total * 100) if total > 0 else 0
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
