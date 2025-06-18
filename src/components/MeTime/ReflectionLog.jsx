import { useState, useEffect } from "react";

export default function ReflectionLog() {
  const [reflection, setReflection] = useState("");
  const [reflections, setReflections] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch all reflections
  useEffect(() => {
    fetchReflections();
  }, []);

  const fetchReflections = async () => {
    const res = await fetch("/api/reflections");
    const data = await res.json();
    setReflections(data);
  };

  const handleSave = async () => {
    if (!reflection.trim()) return;

    if (editingId) {
      // Update existing reflection
      const res = await fetch(`/api/reflections/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: reflection }),
      });
      await res.json();
      setEditingId(null);
    } else {
      // Create new reflection
      const res = await fetch("/api/reflections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: reflection }),
      });
      await res.json();
    }

    setReflection("");
    fetchReflections();
  };

  const handleEdit = (id, content) => {
    setEditingId(id);
    setReflection(content);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/reflections/${id}`, {
      method: "DELETE",
    });
    fetchReflections();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-green-900 flex items-center gap-2">
        📝 Reflection Log
      </h2>

      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Write your thoughts here..."
        className="w-full h-28 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-rose-300"
      />

      <button
        onClick={handleSave}
        className="mt-4 bg-softBrown text-white px-4 py-2 rounded-md hover:bg-rose-400 transition"
      >
        {editingId ? "Update Reflection" : "Save Reflection"}
      </button>

      <div className="mt-6 space-y-4">
        {reflections.map((r) => (
          <div
            key={r._id}
            className="p-4 bg-softCream rounded-md border border-gray-200 shadow-inner"
          >
            <p className="text-sm text-gray-700">💭 {new Date(r.createdAt).toLocaleString()}</p>
            <p className="text-base mt-1">{r.content}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(r._id, r.content)}
                className="text-blue-600 text-sm hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(r._id)}
                className="text-red-600 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
