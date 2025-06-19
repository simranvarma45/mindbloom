import { useState } from "react";

const moods = [
  { emoji: "😊", label: "Happy", color: "bg-yellow-100" },
  { emoji: "😔", label: "Sad", color: "bg-blue-100" },
  { emoji: "😠", label: "Angry", color: "bg-red-100" },
  { emoji: "😌", label: "Calm", color: "bg-green-100" },
  { emoji: "😕", label: "Confused", color: "bg-purple-100" },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 text-green-900 font-serif">Mood Tracker</h2>
      <p className="text-md text-gray-700 mb-6">How are you feeling today?</p>

      <div className="flex flex-wrap justify-center gap-5">
        {moods.map((mood, index) => (
          <button
            key={index}
            onClick={() => setSelectedMood(mood.label)}
            className={`w-16 h-16 flex items-center justify-center text-3xl rounded-full shadow-sm hover:scale-110 transition-all duration-200 
              ${
                selectedMood === mood.label
                  ? `${mood.color} ring-4 ring-rose-300`
                  : "bg-gray-100"
              }`}
            title={mood.label}
          >
            {mood.emoji}
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="mt-6 p-4 bg-rose-50 text-softBrown rounded-lg shadow-inner animate-fade-in">
          <p className="text-md">
            You’re feeling <span className="font-semibold">{selectedMood}</span> today.
          </p>
        </div>
      )}
    </div>
  );
}
