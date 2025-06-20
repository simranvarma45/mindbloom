import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrashAlt, FaPlusCircle, FaSave } from "react-icons/fa";
import { BASE_URL } from "../../config";

export default function ActivityList() {
  const [activities, setActivities] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  const listRef = useRef(null);
  const inputRef = useRef(null);

  const fetchActivities = async () => {
    if (!token) {
      toast.error("Please login to view your activities.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setActivities(data.reverse()); // show newest first
    } catch (err) {
      console.error("Error fetching activities:", err);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!token) {
      toast.error("Please login to manage your activities.");
      return;
    }

    if (!title.trim()) return;

    try {
      if (editingId) {
        const res = await fetch(`${BASE_URL}/api/activities/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title }),
        });
        const data = await res.json();
        setActivities((prev) =>
          prev.map((item) => (item._id === editingId ? data : item))
        );
        toast.success("Activity updated");
      } else {
        const res = await fetch(`${BASE_URL}/api/activities`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title }),
        });
        const data = await res.json();
        setActivities((prev) => [data, ...prev]);
        toast.success("Activity added");

        setTimeout(() => {
          listRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }

      setTitle("");
      setEditingId(null);
      inputRef.current?.focus();
    } catch (err) {
      console.error("Error saving activity:", err);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!token) {
      toast.error("Please login to delete your activity.");
      return;
    }

    try {
      await fetch(`${BASE_URL}/api/activities/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities((prev) => prev.filter((item) => item._id !== id));
      toast.success("Activity deleted");
    } catch (err) {
      console.error("Error deleting activity:", err);
      toast.error("Failed to delete activity");
    }
  };

  const handleEdit = (activity) => {
    setTitle(activity.title);
    setEditingId(activity._id);
    inputRef.current?.focus();
  };

  return (
    <div className="bg-gradient-to-b from-pink-50 to-rose-100 rounded-3xl shadow-lg p-6 max-w-xl mx-auto mt-10 border border-rose-200">
      <h2 className="text-3xl font-serif font-semibold text-center text-rose-700 mb-6">
        🌸 MeTime Activities
      </h2>

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 px-4 py-2 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-200 bg-white"
          placeholder="Add a peaceful or mindful activity..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={handleAddOrUpdate}
          className={`flex items-center gap-2 px-5 py-2 text-white rounded-xl shadow transition-all ${
            editingId
              ? "bg-yellow-400 hover:bg-yellow-500"
              : "bg-pink-400 hover:bg-pink-500"
          }`}
        >
          {editingId ? <><FaSave /> Update</> : <><FaPlusCircle /> Add</>}
        </button>
      </div>

      {/* Activities List */}
      <div ref={listRef}>
        {activities.length === 0 ? (
          <p className="text-gray-500 text-center italic">
            Nothing here yet. Begin your self-care list ✨
          </p>
        ) : (
          <ul className="space-y-4">
            {activities.map((activity, i) => (
              <li
                key={activity._id}
                className="bg-white border border-rose-100 p-4 rounded-2xl shadow-sm flex justify-between items-center hover:shadow-md transition-all duration-300 animate-fade-in"
              >
                <span className="text-rose-800 font-medium">{activity.title}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(activity)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(activity._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
