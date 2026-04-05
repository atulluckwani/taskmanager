import json
import os
import uuid
from datetime import datetime
from typing import List, Dict, Optional

class TaskDatabase:
    def __init__(self, filepath: str = "tasks.json"):
        self.filepath = filepath
        self.tasks: Dict[str, dict] = {}
        self.load_tasks()
    
    def load_tasks(self):
        """Load tasks from JSON file"""
        if os.path.exists(self.filepath):
            try:
                with open(self.filepath, 'r') as f:
                    data = json.load(f)
                    self.tasks = data.get('tasks', {})
            except json.JSONDecodeError:
                self.tasks = {}
        else:
            self.tasks = {}
    
    def save_tasks(self):
        """Save tasks to JSON file"""
        with open(self.filepath, 'w') as f:
            json.dump({'tasks': self.tasks}, f, indent=2)
    
    def create_task(self, title: str, description: Optional[str] = None, 
                   due_date: Optional[str] = None, priority: str = "Medium") -> dict:
        """Create a new task"""
        task_id = str(uuid.uuid4())
        now = datetime.now().isoformat()
        
        task = {
            "id": task_id,
            "title": title,
            "description": description,
            "due_date": due_date,
            "priority": priority,
            "completed": False,
            "created_at": now,
            "updated_at": now
        }
        
        self.tasks[task_id] = task
        self.save_tasks()
        return task
    
    def get_task(self, task_id: str) -> Optional[dict]:
        """Get a specific task"""
        return self.tasks.get(task_id)
    
    def get_all_tasks(self) -> List[dict]:
        """Get all tasks"""
        return list(self.tasks.values())
    
    def update_task(self, task_id: str, updates: dict) -> Optional[dict]:
        """Update an existing task"""
        if task_id not in self.tasks:
            return None
        
        task = self.tasks[task_id]
        allowed_fields = {'title', 'description', 'due_date', 'priority', 'completed'}
        
        for key, value in updates.items():
            if key in allowed_fields:
                task[key] = value
        
        task['updated_at'] = datetime.now().isoformat()
        self.save_tasks()
        return task
    
    def delete_task(self, task_id: str) -> bool:
        """Delete a task"""
        if task_id not in self.tasks:
            return False
        
        del self.tasks[task_id]
        self.save_tasks()
        return True
