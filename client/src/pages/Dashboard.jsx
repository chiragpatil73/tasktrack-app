import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', { headers });
      setTasks(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error fetching tasks');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (form._id) {
        await axios.put(`http://localhost:5000/api/tasks/${form._id}`, form, { headers });
        toast.success('Task updated');
      } else {
        await axios.post('http://localhost:5000/api/tasks', form, { headers });
        toast.success('Task added');
      }
      setForm({ title: '', description: '' });
      fetchTasks();
    } catch (err) {
      toast.error('Failed to create/update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, { headers });
      toast.success('Task deleted');
      fetchTasks();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Logged out');
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">📋 My Tasks</h2>
        <button onClick={handleLogout} className="logout-button">🚪 Logout</button>
      </div>

      <form onSubmit={handleCreate}>
        <div className='input-box'>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className='input-box'>
          <input
            type="text"
            name="description"
            placeholder="Task Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <button type="submit" className="task-submit-button">
          {form._id ? '💾 Update Task' : '➕ Add Task'}
        </button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-card">
            <div className="task-content">
              <h3 className="task-title">{task.title}</h3>
              <p className="task-desc">{task.description}</p>
            </div>
            <div className="task-actions-vertical">
              <button onClick={() => setForm(task)} className="edit-button">✏️ Edit</button>
              <button onClick={() => handleDelete(task._id)} className="delete-button">🗑️ Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
