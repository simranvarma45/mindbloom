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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-teal-50 px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-serif text-softBrown flex justify-center items-center mb-6 mt-0 gap-2">
          <FaHeadphones className="text-rose-400 text-3xl" />
          Guided Meditations
        </h1>
        <p className="text-gray-600 mt-2 text-sm mb-10">
          Relax, breathe, and enjoy the stillness within.
        </p>
      </div>

      {/* Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto px-2">
  {meditations.map((meditation, index) => (
    <div
      key={index}
      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition border border-gray-100 hover:border-rose-200"
    >
      <h2 className="text-xl font-semibold text-softBrown mb-1">
        {meditation.title}
      </h2>
      <p className="text-sm text-gray-600 mb-3">{meditation.description}</p>

      {/* Audio Player */}
      <audio
        controls
        className="w-full rounded-md overflow-hidden focus:outline-none"
      >
        <source src={meditation.src} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Duration */}
      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
        <FaClock className="text-gray-400" />
        Duration: {meditation.duration}
      </p>
    </div>
  ))}
</div>
    </div>
  );
}