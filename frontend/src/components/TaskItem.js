import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingData, setEditingData] = React.useState(task);

  const handleEditChange = (field, value) => {
    setEditingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = () => {
    onUpdate(task.id, editingData);
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = () => {
    if (!task.due_date || task.completed) return false;
    return new Date(task.due_date) < new Date();
  };

  if (isEditing) {
    return (
      <div className="task-edit-mode">
        <input
          type="text"
          value={editingData.title}
          onChange={(e) => handleEditChange('title', e.target.value)}
          className="edit-input-title"
        />
        <textarea
          value={editingData.description || ''}
          onChange={(e) => handleEditChange('description', e.target.value)}
          className="edit-input-desc"
          rows="2"
        />
        <div className="edit-controls">
          <button onClick={handleSaveEdit} className="btn-save">Save</button>
          <button onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          id={`task-${task.id}`}
        />
        <label htmlFor={`task-${task.id}`}></label>
      </div>

      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        {task.due_date && (
          <div className="task-due-date">
            <span className={isOverdue() ? 'overdue-text' : ''}>
              📅 {formatDate(task.due_date)}
            </span>
          </div>
        )}

        <div className="task-timestamps">
          <small>Added: {formatDate(task.created_at)}</small>
          {task.updated_at !== task.created_at && (
            <small>Updated: {formatDate(task.updated_at)}</small>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          className="btn-edit"
          onClick={() => setIsEditing(true)}
          title="Edit task"
        >
          ✏️
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
