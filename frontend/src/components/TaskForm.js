import React from 'react';
import './TaskForm.css';

const TaskForm = ({ onAddTask, loading }) => {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'Medium',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAddTask(formData);
      setFormData({
        title: '',
        description: '',
        due_date: '',
        priority: 'Medium',
      });
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="title"
          placeholder="What needs to be done?"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <textarea
            name="description"
            placeholder="Add description (optional)"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            disabled={loading}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
        </div>

        <button type="submit" className="btn-add" disabled={loading}>
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
