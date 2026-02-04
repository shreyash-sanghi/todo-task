import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../../Constant/Header";
import Card from "../../Constant/Card";
import { axiosInstance } from "../../API/axiosApi";
import toast from "react-hot-toast";

function HomePage() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);

  const isTaskOverdue = (task) => {
    const deadlineDateTime = new Date(`${task.taskDeadline}T${task.taskTime}`);
    const now = new Date();
    return now > deadlineDateTime && task.currentStatus === "Pending";
  };

  const getPendingCount = async () => {
    try {
      const res = await axiosInstance.get("/task/get-pending-task");
      setPendingCount(res?.data?.data || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    try {
      const res = await axiosInstance.get("/task/get");
      const fetchedTasks = res?.data?.data || [];
      setTasks(fetchedTasks);

      fetchedTasks.forEach((task) => {
        if (isTaskOverdue(task)) {
          handleStatus(task._id, "Overdue");
        }
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getTasks();
    getPendingCount();
  }, []);

  const handleStatus = async (taskId, currentStatus) => {
    try {
      await axiosInstance.patch(`/task/status/${taskId}`, { currentStatus });
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, currentStatus } : task
        )
      );
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await axiosInstance.delete(`/task/delete/${taskId}`);
      toast.success("Task deleted");
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleTaskEdit = async (task) => {
    try {
      await axiosInstance.put(`/task/edit/${task._id}`, task);
      toast.success("Task updated");
      getTasks();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const completionPercentage =
    tasks.length > 0
      ? Math.round((pendingCount / tasks.length) * 100)
      : 0;

  return (
    <div className="min-h-screen text-black p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Simple Header */}
        <Header />


        {/* Task List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="bg-white/10 rounded-xl p-6 text-center text-gray-300">
              No tasks available
            </div>
          ) : (
            tasks.map((task) => (
              <Card
                key={task._id}
                task={task}
                currentStatus={[
                  { name: "Pending" },
                  { name: "Completed" },
                  { name: "Overdue" },
                ]}
                onTaskComplete={handleStatus}
                onTaskDelete={handleTaskDelete}
                onTaskEdit={handleTaskEdit}
              />
            ))
          )}
        </div>

        {/* Add Task Button */}
        <button
          onClick={() => navigate("/add")}
          className="fixed bottom-8 right-8 w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default HomePage;
