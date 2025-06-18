import MeTimeTimer from "../../components/MeTime/Timer";

export default function TimerPage() {
  return (
    <div className="mt-10 flex justify-center">
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-earthText mb-4 text-center">
          Focus Timer
        </h1>
        <MeTimeTimer />
      </div>
    </div>
  );
}
