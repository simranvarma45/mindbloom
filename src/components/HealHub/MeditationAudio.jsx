import React from "react";
import { FaClock, FaHeadphones } from "react-icons/fa";

const meditations = [
  {
    title: "Morning Calm",
    description: "Start your day with a calm mind.",
    src: "/assets/audio/please-calm-my-mind-125566.mp3",
    duration: "2:55",
  },
  {
    title: "Yoga with Peace",
    description: "Yoga for peaceful mind",
    src: "/assets/audio/yoga-308058.mp3",
    duration: "1:47",
  },
  {
    title: "Anxiety Relief",
    description: "Let go of stress and anxiety.",
    src: "/assets/audio/meditation-blue-138131.mp3",
    duration: "1:21",
  },
  {
    title: "Feel at Ease",
    description: "Makes you feel at ease and better",
    src: "/assets/audio/better-day-186374.mp3",
    duration: "1:30",
  },
  {
    title: "Focusing Music",
    description: "Make you more focused and productive.",
    src: "/assets/audio/focus-lofi-269097.mp3",
    duration: "1:46",
  },
  {
    title: "Just Relax",
    description: "Just be relaxed, away from all anxiety",
    src: "/assets/audio/just-relax-11157.mp3",
    duration: "2:40",
  },
];

export default function MeditationAudio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-emerald-50 px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-rose-800 flex justify-center items-center gap-2">
          <FaHeadphones className="text-rose-400 text-3xl" />
          Guided Meditations
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          Relax, breathe, and enjoy the stillness within.
        </p>
      </div>

      {/* Meditation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-2">
        {meditations.map((meditation, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-rose-200 p-5 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-rose-700">
                {meditation.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1 mb-3">
                {meditation.description}
              </p>
            </div>

            {/* Audio Player */}
            <audio
              controls
              className="w-full rounded-lg bg-rose-100 border border-gray-200 focus:outline-none"
            >
              <source src={meditation.src} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>

            {/* Duration */}
            <div className="mt-3 flex items-center text-gray-500 text-xs gap-2">
              <FaClock className="text-rose-400" />
              Duration: {meditation.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
