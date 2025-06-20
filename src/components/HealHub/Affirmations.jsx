import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  fetchUserAffirmations,
  addAffirmation,
  deleteAffirmation,
} from "../../api/affirmationAPI";

import {
  FaQuoteLeft,
  FaQuoteRight,
  FaRedoAlt,
  FaRegCopy,
  FaPlus,
  FaPlay,
  FaPause,
} from "react-icons/fa";

const initialAffirmations = [
  "I am calm, centered, and in control.",
  "My mind is at peace and my heart is open.",
  "I deserve love, peace, and happines.",
  "I release tension and welcome serenity.",
  "Every breath I take fills me with calm.",
  "I radiate positivity and attract good things.",
  "I am becoming the best version of myself each day.",
  "Peace flows through me with every breath.",
  "I trust the process of life and let go of what I can’t control.",
  "I am safe, I am loved, I am healing.",
];

const themes = {
  Calm: "from-blue-50 to-teal-50",
  Focus: "from-yellow-50 to-rose-50",
  Joy: "from-pink-100 to-orange-100",
};

export default function PositiveAffirmations() {
  const [userAffirmations, setUserAffirmations] = useState([]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [newAffirmation, setNewAffirmation] = useState("");
  const [autoPlay, setAutoPlay] = useState(true);
  const [theme, setTheme] = useState("Focus");

  const token = localStorage.getItem("token");
  const allAffirmations = [
    ...initialAffirmations,
    ...userAffirmations.map((a) => a.text),
  ];
  const currentAffirmation = allAffirmations[index % allAffirmations.length];

  // Load user affirmations
  useEffect(() => {
    const loadAffirmations = async () => {
      try {
        const data = await fetchUserAffirmations(token);
        setUserAffirmations(data);
      } catch (err) {
        console.error("Failed to load affirmations", err);
      }
    };
    loadAffirmations();
  }, [token]);

  // Auto-play
  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => nextAffirmation(), 10000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, allAffirmations.length]);

  const nextAffirmation = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % allAffirmations.length);
      setFade(true);
    }, 200);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentAffirmation);
    alert("Affirmation copied to clipboard!");
  };

  const handleAddAffirmation = async () => {
  if (!token) {
    toast.error("Login to add affirmation 🌱");
    return;
  }

  if (newAffirmation.trim()) {
    try {
      const saved = await addAffirmation(newAffirmation.trim(), token);
      setUserAffirmations((prev) => [...prev, saved]);
      setNewAffirmation("");
      toast.success("Your affirmation was added!");
    } catch (err) {
      console.error("Add failed", err);
      toast.error("Failed to add affirmation.");
    }
  }
};


  const handleDelete = async (id) => {
    try {
      await deleteAffirmation(id, token);
      setUserAffirmations((prev) => prev.filter((item) => item._id !== id));
      alert("Affirmation deleted!");
      // Prevent index overflow
      setIndex((prev) =>
        prev >= allAffirmations.length - 1 ? 0 : prev
      );
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete affirmation.");
    }
  };

  return (
    <div
      className={`min-h-screen pt-28 pb-12 bg-gradient-to-b ${themes[theme]} transition-all duration-700`}
    >
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-serif text-softBrown mb-8">
          💬 Positive Affirmations
        </h1>

        {/* Theme Selector */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {Object.keys(themes).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-4 py-1 rounded-full text-sm font-medium border transition ${
                theme === t
                  ? "bg-rose-400 text-white border-rose-400"
                  : "border-rose-300 text-rose-700 bg-white"
              }`}
            >
              {t} Mode
            </button>
          ))}
        </div>

        {/* Quote Box */}
        <div
          className={`relative bg-white border border-rose-200 rounded-xl shadow-lg p-6 text-softBrown text-lg md:text-xl leading-relaxed transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <FaQuoteLeft className="absolute top-4 left-4 text-rose-200 text-sm md:text-base" />
          <div className="px-4 md:px-6 font-serif italic flex justify-between items-center">
            <span>{currentAffirmation}</span>
            {index >= initialAffirmations.length && (
              <button
                onClick={() =>
                  handleDelete(
                    userAffirmations[index - initialAffirmations.length]._id
                  )
                }
                className="ml-3 text-red-500 text-sm hover:text-red-700 transition"
                title="Delete this affirmation"
              >
                ✖
              </button>
            )}
          </div>
          <FaQuoteRight className="absolute bottom-4 right-4 text-rose-200 text-sm md:text-base" />
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={nextAffirmation}
            className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2"
          >
            <FaRedoAlt /> Next
          </button>

          <button
            onClick={copyToClipboard}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow flex items-center gap-2"
          >
            <FaRegCopy /> Copy
          </button>

          <button
            onClick={() => setAutoPlay((prev) => !prev)}
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-900 px-4 py-2 rounded-lg shadow flex items-center gap-2"
          >
            {autoPlay ? <FaPause /> : <FaPlay />}{" "}
            {autoPlay ? "Pause Auto" : "Auto Play"}
          </button>
        </div>

        {/* Add Your Own */}
        <div className="mt-10">
          <input
            type="text"
            placeholder="Write your own affirmation..."
            value={newAffirmation}
            onChange={(e) => setNewAffirmation(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-3 focus:outline-none focus:ring focus:ring-rose-200"
          />
          <button
            onClick={handleAddAffirmation}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow flex items-center mx-auto gap-2"
          >
            <FaPlus /> Add Affirmation
          </button>
        </div>
      </div>
    </div>
  );
}
