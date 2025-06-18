import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ActivityList() {
  const [activities, setActivities] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchActivities = async () => {
    const res = await fetch("http://localhost:5000/api/activities");
    const data = await res.json();
    setActivities(data);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!title.trim()) return;

    if (editingId) {
      // Update
      const res = await fetch(`http://localhost:5000/api/activities/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      setActivities((prev) =>
        prev.map((item) => (item._id === editingId ? data : item))
      );
      toast.success("Activity updated");
    } else {
      // Add
      const res = await fetch("http://localhost:5000/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      setActivities([data, ...activities]);
      toast.success("Activity added");
    }

    setTitle("");
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/activities/${id}`, {
      method: "DELETE",
    });
    setActivities(activities.filter((item) => item._id !== id));
    toast.success("Activity deleted");
  };

  const handleEdit = (activity) => {
    setTitle(activity.title);
    setEditingId(activity._id);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📝 MeTime Activities</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-grow border px-3 py-2 rounded"
          placeholder="Enter activity..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-softBrown text-white px-4 py-2 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {activities.map((activity) => (
          <li
            key={activity._id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>{activity.title}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(activity)}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(activity._id)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
