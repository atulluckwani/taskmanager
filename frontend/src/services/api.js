import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // Get all tasks
  getAllTasks: () => api.get('/api/tasks'),
  
  // Get tasks with filter
  getFilteredTasks: (completed, priority) => {
    const params = {};
    if (completed !== undefined) params.completed = completed;
    if (priority) params.priority = priority;
    return api.get('/api/tasks', { params });
  },
  
  // Get a specific task
  getTask: (id) => api.get(`/api/tasks/${id}`),
  
  // Create a new task
  createTask: (taskData) => api.post('/api/tasks', taskData),
  
  // Update a task
  updateTask: (id, taskData) => api.put(`/api/tasks/${id}`, taskData),
  
  // Delete a task
  deleteTask: (id) => api.delete(`/api/tasks/${id}`),
  
  // Toggle task completion
  toggleTask: (id) => api.post(`/api/tasks/${id}/toggle`),
  
  // Get statistics
  getStats: () => api.get('/api/stats'),
  
  // Health check
  healthCheck: () => api.get('/api/health'),
};

export default api;
