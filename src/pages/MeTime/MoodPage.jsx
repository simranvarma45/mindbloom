import MoodTracker from "../../components/MeTime/MoodTracker";

export default function MoodPage() {
  return (
    <div className="mt-10 flex justify-center">
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-earthText mb-4 text-center">
          Mood Tracker
        </h1>
        <MoodTracker />
      </div>
    </div>
  );
}
