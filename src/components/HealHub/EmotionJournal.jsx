import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
      const res = await fetch("http://localhost:5000/api/emotions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setEntries(data.reverse());
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (err) {
      console.error("Failed to fetch emotions:", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async () => {
    if (!token) {
      toast.error("Please login to add an entry");
      return;
    }

    if (text.trim() === "") return;

    try {
      if (isEditing) {
        const res = await fetch(`http://localhost:5000/api/emotions/${editId}`, {
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
        setIsEditing(false);
        setEditId(null);
      } else {
        const res = await fetch("http://localhost:5000/api/emotions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text, date: formatDate() }),
        });
        if (res.status === 201) {
          fetchEntries(); // refresh list after adding
        } else {
          const data = await res.json();
          toast.error(data.message || "Failed to add entry");
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
    if (!token) {
      toast.error("Please login to delete an entry");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/emotions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchEntries(); // refresh after deletion
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete");
      }
    } catch (err) {
      console.error("Error deleting emotion:", err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Emotion/Gratitude Journal</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="bg-softBrown text-white px-4 py-2 rounded-md hover:bg-rose-400 transition"
        >
          {isEditing ? "Update" : "Add"}
        </button>
      </div>

      <ul className="space-y-2">
        {entries.map((entry, index) => (
          <li key={entry._id || index} className="bg-softCream px-4 py-2 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-earthText">{entry.text}</p>
                <p className="text-sm text-gray-500">{entry.date}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(entry)}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(entry._id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ❌
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
