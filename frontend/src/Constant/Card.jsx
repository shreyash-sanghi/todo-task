import React, { useState } from 'react';
import { IoMdCheckmarkCircleOutline, IoMdClose } from 'react-icons/io';
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { AiOutlineWarning } from "react-icons/ai";

function Card({ task, currentStatus, onTaskComplete, onTaskDelete, onTaskEdit }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const [editForm, setEditForm] = useState({
    taskName: task.taskName,
    taskDescription: task.taskDescription,
    taskDeadline: task.taskDeadline,
    taskTime: task.taskTime,
    currentStatus: task.currentStatus,
  });

  const isCompleted = task.currentStatus === 'Completed';

  const handleEditClick = () => {
    setEditForm({
      taskName: task.taskName,
      taskDescription: task.taskDescription,
      taskDeadline: task.taskDeadline,
      taskTime: task.taskTime,
      currentStatus: task.currentStatus,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    onTaskEdit?.({ ...task, ...editForm });
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    onTaskDelete?.(task._id);
    setShowDeleteModal(false);
  };

  const handleCompleteConfirm = () => {
    onTaskComplete?.(task._id, "Completed");
    setShowCompleteModal(false);
  };

  return (
    <>
      {/* Card */}
      <div className="bg-white rounded-xl border p-4 shadow-sm">
        <div className="flex justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${isCompleted && 'line-through text-gray-400'}`}>
              {task.taskName}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              {task.taskDescription}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              {task.taskDeadline} • {task.taskTime}
            </p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setShowDeleteModal(true)}>
              <MdDeleteOutline className="text-xl text-red-500" />
            </button>
            <button onClick={handleEditClick}>
              <CiEdit className="text-xl text-green-600" />
            </button>
          </div>
        </div>

        {!isCompleted && (
          <button
            onClick={() => setShowCompleteModal(true)}
            className="mt-4 text-sm text-green-600 font-semibold"
          >
            Mark Complete
          </button>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-5 w-full max-w-md">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-lg">Edit Task</h2>
              <button onClick={() => setShowEditModal(false)}>
                <IoMdClose />
              </button>
            </div>

            <input
              className="w-full border p-2 mb-3 rounded"
              value={editForm.taskName}
              onChange={(e) => setEditForm({ ...editForm, taskName: e.target.value })}
            />

            <textarea
              className="w-full border p-2 mb-3 rounded"
              value={editForm.taskDescription}
              onChange={(e) => setEditForm({ ...editForm, taskDescription: e.target.value })}
            />

            <div className="flex gap-2 mb-3">
              <input
                type="date"
                className="w-full border p-2 rounded"
                value={editForm.taskDeadline}
                onChange={(e) => setEditForm({ ...editForm, taskDeadline: e.target.value })}
              />
              <input
                type="time"
                className="w-full border p-2 rounded"
                value={editForm.taskTime}
                onChange={(e) => setEditForm({ ...editForm, taskTime: e.target.value })}
              />
            </div>

            <select
              className="w-full border p-2 rounded mb-4"
              value={editForm.currentStatus}
              onChange={(e) => setEditForm({ ...editForm, currentStatus: e.target.value })}
            >
              {currentStatus.map(s => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="w-full border rounded p-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="w-full bg-green-600 text-white rounded p-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <AiOutlineWarning className="text-3xl text-red-500 mx-auto mb-3" />
            <p className="mb-4">Delete this task?</p>
            <div className="flex gap-2">
              <button onClick={() => setShowDeleteModal(false)} className="w-full border p-2 rounded">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="w-full bg-red-600 text-white p-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <IoMdCheckmarkCircleOutline className="text-3xl text-green-500 mx-auto mb-3" />
            <p className="mb-4">Mark task as completed?</p>
            <div className="flex gap-2">
              <button onClick={() => setShowCompleteModal(false)} className="w-full border p-2 rounded">
                Cancel
              </button>
              <button onClick={handleCompleteConfirm} className="w-full bg-green-600 text-white p-2 rounded">
                Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
