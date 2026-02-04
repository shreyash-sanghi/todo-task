import React, { useState } from 'react';
import Header from '../../Constant/Header';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../API/axiosApi';

function AddTask() {
  const [formData, setFormData] = useState({
    taskName: '',
    taskDescription: '',
    taskDeadline: '',
    taskTime: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post('/task/create', formData);
      toast.success('Task created');
      setFormData({
        taskName: '',
        taskDescription: '',
        taskDeadline: '',
        taskTime: '',
      });
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header text="Add Task" subtext="" handleGoBack={() => window.history.back()} />

      <div className="max-w-md mx-auto bg-white border rounded-lg p-6 mt-6">
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm font-medium">Task Name</label>
            <input
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="taskDescription"
              value={formData.taskDescription}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Deadline Date</label>
            <input
              type="date"
              name="taskDeadline"
              value={formData.taskDeadline}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Deadline Time</label>
            <input
              type="time"
              name="taskTime"
              value={formData.taskTime}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded mt-4"
          >
            {loading ? 'Saving...' : 'Create Task'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddTask;
