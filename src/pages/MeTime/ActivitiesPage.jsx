import ActivityList from "../../components/MeTime/ActivityList";

export default function ActivitiesPage() {
  return (
    <div className="mt-10 flex justify-center">
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-earthText mb-4 text-center">
          MeTime Activities
        </h1>
        <ActivityList />
      </div>
    </div>
  );
}
