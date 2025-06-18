import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight, FaRedoAlt, FaRegCopy } from "react-icons/fa";

const affirmations = [
  "I am calm, centered, and in control.",
  "My mind is at peace and my heart is open.",
  "I deserve love, peace, and happiness.",
  "I release tension and welcome serenity.",
  "Every breath I take fills me with calm.",
  "I radiate positivity and attract good things.",
  "I am becoming the best version of myself each day.",
  "Peace flows through me with every breath.",
  "I trust the process of life and let go of what I can’t control.",
  "I am safe, I am loved, I am healing."
];

export default function PositiveAffirmations() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const nextAffirmation = () => {
    setFade(false); // start fade out
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % affirmations.length);
      setFade(true); // fade in new quote
    }, 200);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affirmations[index]);
  };

  useEffect(() => {
    let interval;

    const startRotation = () => {
      interval = setInterval(() => {
        nextAffirmation();
      }, 10000);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startRotation();
      } else {
        clearInterval(interval);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    startRotation();

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-12 bg-gradient-to-b from-pink-50 to-yellow-50">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-serif text-softBrown mb-10">
          💬 Positive Affirmations
        </h1>

        <div
          className={`relative bg-white border border-rose-200 rounded-xl shadow-md p-6 text-softBrown text-lg md:text-xl leading-relaxed transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <FaQuoteLeft className="absolute top-4 left-4 text-rose-200 text-sm md:text-base" />
          <p className="px-4 md:px-6 font-serif italic">{affirmations[index]}</p>
          <FaQuoteRight className="absolute bottom-4 right-4 text-rose-200 text-sm md:text-base" />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={nextAffirmation}
            className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-lg shadow flex items-center justify-center gap-2"
          >
            <FaRedoAlt /> Next
          </button>
          <button
            onClick={copyToClipboard}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow flex items-center justify-center gap-2"
          >
            <FaRegCopy /> Copy
          </button>
        </div>
      </div>
    </div>
  );
}
