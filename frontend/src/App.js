import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { taskService } from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, completed: 0, active: 0 });

  // Load tasks from API
  useEffect(() => {
    loadTasks();
    loadStats();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskService.getAllTasks();
      setTasks(response.data);
      // Save to local storage as backup
      localStorage.setItem('tasks_backup', JSON.stringify(response.data));
    } catch (err) {
      setError('Failed to load tasks');
      // Try to load from local storage
      const backup = localStorage.getItem('tasks_backup');
      if (backup) {
        setTasks(JSON.parse(backup));
      }
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await taskService.getStats();
      setStats(response.data);
    } catch (err) {
      // Stats not critical, continue
    }
  };

  const handleAddTask = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskService.createTask(taskData);
      setTasks([...tasks, response.data]);
      loadStats();
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId) => {
    setLoading(true);
    try {
      const response = await taskService.toggleTask(taskId);
      setTasks(tasks.map(t => t.id === taskId ? response.data : t));
      loadStats();
    } catch (err) {
      setError('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      try {
        await taskService.deleteTask(taskId);
        setTasks(tasks.filter(t => t.id !== taskId));
        loadStats();
      } catch (err) {
        setError('Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    setLoading(true);
    try {
      const response = await taskService.updateTask(taskId, updates);
      setTasks(tasks.map(t => t.id === taskId ? response.data : t));
      loadStats();
    } catch (err) {
      setError('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  // Filter tasks based on filter state
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  return (
    <div className="app">
      <div className="background-decoration">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="container">
        <header className="app-header">
          <div className="header-content">
            <h1>📋 Task Manager</h1>
            <p className="subtitle">Stay organized and productive</p>
          </div>

          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Total</span>
              <span className="stat-value">{stats.total}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Active</span>
              <span className="stat-value active">{stats.active}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Completed</span>
              <span className="stat-value completed">{stats.completed}</span>
            </div>
          </div>
        </header>

        {error && (
          <div className="alert alert-error">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)} className="close-alert">✕</button>
          </div>
        )}

        <TaskForm onAddTask={handleAddTask} loading={loading} />

        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Tasks ({tasks.length})
          </button>
          <button
            className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({stats.active})
          </button>
          <button
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({stats.completed})
          </button>
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          filter={filter}
          emptyMessage={
            filter === 'all'
              ? 'No tasks yet. Create one to get started!'
              : filter === 'active'
              ? 'All tasks completed! Great job! 🎉'
              : 'No completed tasks yet.'
          }
        />
      </div>

      <footer className="app-footer">
        <p>Task Manager © 2024 | Stay productive and organized</p>
      </footer>
    </div>
  );
}

export default App;
