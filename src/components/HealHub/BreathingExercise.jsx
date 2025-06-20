import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaRedo, FaHeartbeat } from "react-icons/fa";

const patterns = {
  "Classic (4-4-4)": {
    phases: ["Inhale", "Hold", "Exhale"],
    durations: { Inhale: 4000, Hold: 4000, Exhale: 4000 },
  },
  "Box (4-4-4-4)": {
    phases: ["Inhale", "Hold", "Exhale", "Hold"],
    durations: { Inhale: 4000, Hold: 4000, Exhale: 4000 },
  },
  "4-7-8": {
    phases: ["Inhale", "Hold", "Exhale"],
    durations: { Inhale: 4000, Hold: 7000, Exhale: 8000 },
  },
  "Relaxing Breath (4-6)": {
    phases: ["Inhale", "Exhale"],
    durations: { Inhale: 4000, Exhale: 6000 },
  },
};

export default function BreathingExercise() {
  const [selectedPattern, setSelectedPattern] = useState("Classic (4-4-4)");
  const [phase, setPhase] = useState("Inhale");
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef(null);

  const { phases, durations } = patterns[selectedPattern];

  useEffect(() => {
    if (isRunning) {
      startCycle();
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, selectedPattern]);

  const startCycle = () => {
    let current = 0;
    setPhase(phases[current]);
    intervalRef.current = setInterval(() => {
      current = (current + 1) % phases.length;
      setPhase(phases[current]);
      if (current === 0) setCount((prev) => prev + 1);
    }, durations[phases[current]]);
  };

  const handleStart = () => {
    setStarted(true);
    setIsRunning(true);
    setCount(0);
    setPhase(phases[0]);
  };

  const handlePause = () => setIsRunning(false);
  const handleResume = () => setIsRunning(true);
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setPhase(phases[0]);
    setCount(0);
    setIsRunning(false);
    setStarted(false);
  };

  const getPhaseColor = () => {
    if (phase === "Inhale") return "bg-rose-100";
    if (phase === "Hold") return "bg-yellow-100";
    if (phase === "Exhale") return "bg-blue-100";
    return "bg-gray-100";
  };

  return (
    <div className="bg-gradient-to-br from-white to-rose-50 shadow-xl rounded-2xl p-6 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-rose-700 mb-4 flex justify-center items-center gap-2">
        <FaHeartbeat className="text-rose-500 animate-pulse" />
        Breathing Exercise
      </h2>

      {/* Pattern Selector */}
      <select
        className="mb-4 w-full px-3 py-2 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
        value={selectedPattern}
        onChange={(e) => setSelectedPattern(e.target.value)}
        disabled={started}
      >
        {Object.keys(patterns).map((pattern) => (
          <option key={pattern} value={pattern}>
            {pattern}
          </option>
        ))}
      </select>

      {/* Phase Circle */}
      <div className="flex justify-center items-center mb-6">
        <div
          className={`w-36 h-36 rounded-full flex items-center justify-center text-xl font-semibold text-rose-800 transition-all duration-1000 scale-110 ${getPhaseColor()}`}
        >
          {phase}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {!started && (
          <button
            onClick={handleStart}
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaPlay /> Start
          </button>
        )}
        {started && isRunning && (
          <button
            onClick={handlePause}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaPause /> Pause
          </button>
        )}
        {started && !isRunning && (
          <button
            onClick={handleResume}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaPlay /> Resume
          </button>
        )}
        {started && (
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaRedo /> Reset
          </button>
        )}
      </div>

      {started && (
        <p className="text-sm text-gray-600">
          Completed Cycles: <span className="font-medium">{count}</span>
        </p>
      )}
    </div>
  );
}
