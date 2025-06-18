import { useState, useEffect, useRef } from "react";

export default function MeTimeTimer() {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Timer countdown logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec === 0) {
            if (minutes === 0) {
              clearInterval(timerRef.current);
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

  const handleSetMinutes = (value) => {
    setMinutes(value);
    setSeconds(0);
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const handleCustomInput = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1) handleSetMinutes(val);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setSeconds(0);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md text-center">
      <h2 className="text-xl font-semibold mb-4">⏳ Focus Timer</h2>

      <div className="flex justify-center gap-2 mb-4">
        {[5, 10, 15].map((min) => (
          <button
            key={min}
            onClick={() => handleSetMinutes(min)}
            className="bg-softCream hover:bg-rose-100 px-3 py-1 rounded-md text-sm"
          >
            {min} min
          </button>
        ))}
      </div>

      <input
        type="number"
        min={1}
        placeholder="Custom (min)"
        onChange={handleCustomInput}
        className="border px-2 py-1 rounded-md mb-4 text-center w-32"
      />

      <div className="text-4xl font-bold mb-4">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          className="bg-softBrown text-white px-4 py-2 rounded-md hover:bg-rose-400 transition"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
