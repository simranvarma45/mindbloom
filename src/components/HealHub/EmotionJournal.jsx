import { useEffect, useState } from "react";

export default function EmotionJournal() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Fetch all emotion entries from the backend
  const fetchEntries = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/emotions");
      const data = await res.json();
      setEntries(data.reverse());
    } catch (err) {
      console.error("Failed to fetch emotions:", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async () => {
    if (text.trim() === "") return;

    if (isEditing) {
      // Update entry
      try {
        const res = await fetch(`http://localhost:5000/api/emotions/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        const updated = await res.json();
        setEntries((prev) =>
          prev.map((entry) => (entry._id === editId ? updated : entry))
        );
        setIsEditing(false);
        setEditId(null);
      } catch (err) {
        console.error("Error updating emotion:", err);
      }
    } else {
      // Create new entry
      try {
        const res = await fetch("http://localhost:5000/api/emotions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, date: formatDate() }),
        });
        const newEntry = await res.json();
        setEntries([newEntry, ...entries]);
      } catch (err) {
        console.error("Error adding emotion:", err);
      }
    }

    setText("");
  };

  const handleEdit = (entry) => {
    setText(entry.text);
    setIsEditing(true);
    setEditId(entry._id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/emotions/${id}`, {
        method: "DELETE",
      });
      setEntries(entries.filter((entry) => entry._id !== id));
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
        {entries.map((entry) => (
          <li key={entry._id} className="bg-softCream px-4 py-2 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-earthText">{entry.text}</p>
                <p className="text-sm text-gray-500">{entry.date}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(entry)} className="text-blue-500 hover:text-blue-700 text-sm">✏️</button>
                <button onClick={() => handleDelete(entry._id)} className="text-red-500 hover:text-red-700 text-sm">❌</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
