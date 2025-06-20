import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config";

export default function EmotionJournal() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchEntries = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${BASE_URL}/api/emotions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setEntries(data.reverse());
      }
    } catch (err) {
      console.error("Failed to fetch emotions:", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [token]);

  const handleSubmit = async () => {
    if (!token) return toast.error("Please login to add an entry");
    if (text.trim() === "") return;

    try {
      if (isEditing) {
        const res = await fetch(`${BASE_URL}/api/emotions/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text }),
        });
        const updated = await res.json();
        setEntries((prev) =>
          prev.map((entry) => (entry._id === editId ? updated : entry))
        );
        toast.success("Entry updated");
        setIsEditing(false);
        setEditId(null);
      } else {
        const res = await fetch(`${BASE_URL}/api/emotions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text, date: formatDate() }),
        });
        if (res.status === 201) {
          fetchEntries();
          toast.success("Entry added 💖");
        }
      }
    } catch (err) {
      console.error("Error saving emotion:", err);
    }

    setText("");
  };

  const handleEdit = (entry) => {
    setText(entry.text);
    setIsEditing(true);
    setEditId(entry._id);
  };

  const handleDelete = async (id) => {
    if (!token) return toast.error("Please login to delete an entry");

    try {
      const res = await fetch(`${BASE_URL}/api/emotions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchEntries();
        toast.success("Entry deleted");
      }
    } catch (err) {
      console.error("Error deleting emotion:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-amber-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center text-softBrown mb-6">
          🌿 Emotion / Gratitude Journal
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Today I feel grateful for..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
          <button
            onClick={handleSubmit}
            className="bg-softBrown hover:bg-rose-400 text-white px-5 py-2 rounded-lg shadow transition"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>

        {entries.length === 0 && (
          <p className="text-gray-500 text-center italic">
            No journal entries yet.
          </p>
        )}

        <ul className="space-y-3">
          {entries.map((entry, index) => (
            <li
              key={entry._id || index}
              className="bg-softCream px-5 py-4 rounded-xl shadow-sm border border-rose-100 flex justify-between items-start"
            >
              <div>
                <p className="text-softBrown font-medium">{entry.text}</p>
                <p className="text-sm text-gray-500 mt-1">{entry.date}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <button
                  onClick={() => handleEdit(entry)}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(entry._id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ❌ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
