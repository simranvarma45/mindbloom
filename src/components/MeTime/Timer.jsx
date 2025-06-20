import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaPause, FaRedoAlt } from "react-icons/fa";

export default function MeTimeTimer() {
  const [task, setTask] = useState("");
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef(null);
  const audioRef = useRef(new Audio("/assets/audio/timer-end.mp3"));

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec === 0) {
            if (minutes === 0) {
              clearInterval(timerRef.current);
              setIsRunning(false);
              setIsCompleted(true);
              audioRef.current.play();
              return 0;
            }
            setMinutes((m) => m - 1);
            return 59;
          }
          return prevSec - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, minutes]);

  const handleSetQuickTime = (min) => {
    setMinutes(min);
    setSeconds(0);
    setIsRunning(false);
    setIsCompleted(false);
    clearInterval(timerRef.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setMinutes(0);
    setSeconds(0);
    setTask("");
    setIsCompleted(false);
  };

  return (
    <div className="bg-gradient-to-br from-white to-rose-50 shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto text-center space-y-4">
      <h2 className="text-2xl font-bold text-rose-900 mb-2">⏳ MeTime Focus Timer</h2>

      {/* Task Input */}
      <input
        type="text"
        placeholder="🎯 What are you focusing on?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full border border-rose-200 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-rose-300 outline-none transition"
      />

      {/* Quick Buttons */}
      <div className="flex justify-center gap-3 mt-2">
        {[5, 10, 15].map((min) => (
          <button
            key={min}
            onClick={() => handleSetQuickTime(min)}
            className="bg-rose-100 hover:bg-rose-200 text-rose-800 px-3 py-1 rounded-lg text-sm font-medium transition"
          >
            {min} min
          </button>
        ))}
      </div>

      {/* Manual Time Input */}
      <div className="flex justify-center gap-4 mt-4">
        <input
          type="number"
          min={0}
          placeholder="Min"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
          className="w-20 text-center border border-rose-300 rounded-lg py-1"
        />
        <input
          type="number"
          min={0}
          max={59}
          placeholder="Sec"
          value={seconds}
          onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
          className="w-20 text-center border border-rose-300 rounded-lg py-1"
        />
      </div>

      {/* Timer Display */}
      <div className="text-6xl font-mono font-extrabold text-rose-800 tracking-widest mt-4">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => {
            if (!isRunning) setIsCompleted(false); // ✅ Fix added here
            setIsRunning((prev) => !prev);
          }}
          className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-full flex items-center gap-2 shadow transition"
        >
          {isRunning ? (
            <>
              <FaPause /> Pause
            </>
          ) : (
            <>
              <FaPlay /> Start
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-full flex items-center gap-2 shadow transition"
        >
          <FaRedoAlt /> Reset
        </button>
      </div>

      {/* Completion Message */}
      <AnimatePresence>
        {isCompleted && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-green-700 font-semibold"
          >
            ✅ Great job completing <span className="italic">"{task || "your task"}"</span>!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
