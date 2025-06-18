import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "../utils/uploadImage";
import {
  fetchVisions,
  addVision,
  updateVision,
  deleteVision,
} from "../api/vision"; // adjust path as needed

export default function VisionBoard() {
  const [visionItems, setVisionItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVision, setNewVision] = useState({ title: "", image: "" });
  const [editIndex, setEditIndex] = useState(null); // null = add, number = edit mode

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchVisions();
        setVisionItems(data);
      } catch (err) {
        toast.error("Failed to load visions");
        console.error(err);
      }
    };
    loadData();
  }, []);

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setNewVision({ ...newVision, image: reader.result });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await uploadImage(file);
    setNewVision((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSaveVision = async () => {
    if (!newVision.title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      if (editIndex !== null) {

        const existingItem = visionItems[editIndex]; // already saved vision item

        const finalImage =
          newVision.image?.trim() !== "" ? newVision.image : existingItem.image;

        const updated = await updateVision(existingItem._id, {
          title: newVision.title,
          image: finalImage,
        });

        const updatedItems = [...visionItems];
        updatedItems[editIndex] = {
          ...updatedItems[editIndex],
          title: updated.title,
          image: finalImage,
        };
        setVisionItems(updatedItems);
        toast.success("Vision updated!");
      } else {
        const newItem = await addVision({
          title: newVision.title,
          image: newVision.image,
          achieved: false,
        });

        setVisionItems([
          ...visionItems,
          {
            ...newItem,
            title: newItem.title,
            image: newItem.image || newVision.image,
          },
        ]);
        toast.success("Vision added!");
      }

      setNewVision({ title: "", image: "" });
      setEditIndex(null);
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Error saving vision");
      console.error(err);
    }
  };

  const handleDelete = async (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vision?");
    if (!confirmDelete) return;

    try {
      const id = visionItems[index]._id;
      await deleteVision(id);
      const updatedItems = visionItems.filter((_, i) => i !== index);
      setVisionItems(updatedItems);
      toast.success("Vision deleted");
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  };

  const toggleAchieved = async (index) => {
    try {
      const item = visionItems[index];
      const updated = await updateVision(item._id, {
        achieved: !item.achieved,
      });

      const updatedItems = [...visionItems];
      updatedItems[index] = {
        ...item,
        achieved: updated.achieved,
      };
      setVisionItems(updatedItems);

      toast.success(updated.achieved ? "Marked as achieved!" : "Marked as not achieved");
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  const handleEdit = (index) => {
  setNewVision({
    title: visionItems[index].title,
    image: visionItems[index].image || "", // set image properly here
  });
  setEditIndex(index);
  setIsModalOpen(true);
};


  const defaultImage =
    "https://images.unsplash.com/photo-1556711905-b3f402e1ff80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDAzMzh8MHwxfHNlYXJjaHwxOXx8aGFyZCUyMHdvcmt8ZW58MHx8fHwxNjgxNjcwNjAz&ixlib=rb-4.0.3&q=80&w=1080";

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start px-4 py-10 text-center relative z-10">
      <h2 className="text-3xl md:text-4xl font-serif font-semibold text-earthText mb-4">
        My Vision Board 🌟
      </h2>

      <p className="text-base md:text-lg italic text-softBrown max-w-xl mb-8">
        Visualize your dreams, set your goals, and let the universe do its magic.
      </p>

      <button
        onClick={() => {
          setNewVision({ title: "", image: "" });
          setEditIndex(null);
          setIsModalOpen(true);
        }}
        className="bg-softBrown text-white px-6 py-2 rounded-xl mb-8 hover:bg-rose-400 transition"
      >
        ➕ Add Vision
      </button>

      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visionItems.length === 0 ? (
          <p className="text-sm text-gray-500 col-span-full">
            No visions yet. Start by adding one ✨
          </p>
        ) : (
          visionItems.map((item, index) => (
            <VisionCard
              key={index}
              title={item.title}
              image={item.image}
              achieved={item.achieved}
              onDelete={() => handleDelete(index)}
              onToggleAchieved={() => toggleAchieved(index)}
              onEdit={() => handleEdit(index)}
            />
          ))
        )}
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-earthText">
              {editIndex !== null ? "Edit Vision" : "Add Your Vision"}
            </h3>

            <input
              type="text"
              placeholder="Title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring"
              value={newVision.title}
              onChange={(e) => setNewVision({ ...newVision, title: e.target.value })}
            />

            <input
              type="text"
              placeholder="Image URL (optional)"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring"
              value={newVision.image}
              onChange={(e) => setNewVision({ ...newVision, image: e.target.value })}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
            />

            {newVision.image && (
              <img
                src={newVision.image}
                alt="Preview"
                className="w-full h-32 object-cover rounded-md mb-4"
              />
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditIndex(null);
                  setNewVision({ title: "", image: "" });
                }}
                className="text-sm text-gray-500 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveVision}
                className="bg-softBrown text-white px-4 py-2 rounded-md hover:bg-rose-400 transition"
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VisionCard({ title, image, achieved, onDelete, onToggleAchieved, onEdit }) {
  const defaultImage =
    "https://images.unsplash.com/photo-1556711905-b3f402e1ff80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDAzMzh8MHwxfHNlYXJjaHwxOXx8aGFyZCUyMHdvcmt8ZW58MHx8fHwxNjgxNjcwNjAz&ixlib=rb-4.0.3&q=80&w=1080";

  return (
    <div
      className={`relative bg-white/60 backdrop-blur-lg rounded-xl shadow-md p-4 text-earthText transition-all duration-200 ${achieved ? "opacity-70 grayscale" : ""
        }`}
    >
      <img
        src={image || defaultImage}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold">{title}</h3>

      {achieved && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
          Achieved
        </div>
      )}

      <div className="mt-2 flex justify-between text-sm items-center">
        <button
          onClick={onToggleAchieved}
          className="text-gray-600 hover:text-green-600 transition"
          title="Toggle Achieved"
        >
          {achieved ? "🔁 Unmark" : "✅ Mark Achieved"}
        </button>

        <button
          onClick={onEdit}
          className="text-blue-600 hover:underline"
          title="Edit"
        >
          ✏️ Edit
        </button>

        <button
          onClick={onDelete}
          className="text-gray-500 hover:text-red-500 transition text-lg"
          title="Delete"
        >
          ❌
        </button>
      </div>
    </div>
  );
}
