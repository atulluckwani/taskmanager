import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onToggle, onDelete, onUpdate, filter, emptyMessage }) => {
  const isEmpty = tasks.length === 0;

  return (
    <div className="task-list">
      {isEmpty ? (
        <div className="empty-state">
          <div className="empty-icon">✨</div>
          <h2>{emptyMessage || 'No tasks yet'}</h2>
          <p>
            {filter === 'all'
              ? 'Create a new task to get started!'
              : filter === 'active'
              ? 'All tasks completed! Great job! 🎉'
              : 'No completed tasks yet.'}
          </p>
        </div>
      ) : (
        <div className="tasks-container">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
