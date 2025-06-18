import { useState } from "react";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😠", label: "Angry" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😕", label: "Confused" },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md text-center">
      <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {moods.map((mood, index) => (
          <button
            key={index}
            onClick={() => setSelectedMood(mood.label)}
            className={`text-3xl hover:scale-110 transition-transform ${
              selectedMood === mood.label ? "ring-2 ring-rose-400 rounded-full" : ""
            }`}
            title={mood.label}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
      {selectedMood && (
        <p className="mt-4 text-softBrown font-medium">
          You’re feeling <span className="font-semibold">{selectedMood}</span> today.
        </p>
      )}
    </div>
  );
}
