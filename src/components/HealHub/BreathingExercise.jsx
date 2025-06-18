import { useEffect, useRef, useState } from "react";

export default function BreathingExercise() {
  const [phase, setPhase] = useState("Inhale");
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef(null);

  const phases = ["Inhale", "Hold", "Exhale"];
  const durations = { Inhale: 4000, Hold: 4000, Exhale: 4000 };

  useEffect(() => {
    if (isRunning) {
      startBreathingCycle();
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startBreathingCycle = () => {
    let current = 0;
    setPhase(phases[current]);
    intervalRef.current = setInterval(() => {
      current = (current + 1) % phases.length;
      setPhase(phases[current]);
      setCount((prev) => prev + 1);
    }, durations[phases[current]]);
  };

  const handleStart = () => {
    setStarted(true);
    setIsRunning(true);
    setCount(0);
    setPhase("Inhale");
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setPhase("Inhale");
    setCount(0);
    setIsRunning(false);
    setStarted(false);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-rose-600 mb-6">Breathing Exercise</h2>

      <div className="flex justify-center items-center mb-6">
        <div
          className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-1000 ${
            phase === "Inhale"
              ? "animate-ping-slow bg-rose-200"
              : phase === "Hold"
              ? "bg-yellow-100"
              : "bg-blue-100"
          }`}
        >
          <span className="text-xl font-semibold text-rose-700">{phase}</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {!started && (
          <button
            onClick={handleStart}
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg transition"
          >
            Start
          </button>
        )}

        {started && isRunning && (
          <button
            onClick={handlePause}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition"
          >
            Pause
          </button>
        )}

        {started && !isRunning && (
          <button
            onClick={handleResume}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            Resume
          </button>
        )}

        {started && (
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Reset
          </button>
        )}
      </div>

      {started && (
        <p className="text-gray-500 text-sm">Completed Cycles: {count}</p>
      )}
    </div>
  );
}
