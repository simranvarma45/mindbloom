import { Link } from "react-router-dom";
import { FaSmile, FaListUl, FaClock, FaPenFancy } from "react-icons/fa";

const features = [
  {
    title: "Mood Tracker",
    icon: <FaSmile className="text-2xl text-rose-400" />,
    description: "Track how you feel each day with emojis.",
    path: "/me-time/mood",
  },
  {
    title: "Activities",
    icon: <FaListUl className="text-2xl text-emerald-500" />,
    description: "Add and manage your MeTime activities.",
    path: "/me-time/activities",
  },
  {
    title: "Timer",
    icon: <FaClock className="text-2xl text-yellow-500" />,
    description: "Focus with custom or preset timers.",
    path: "/me-time/timer",
  },
  {
    title: "Reflection Log",
    icon: <FaPenFancy className="text-2xl text-purple-500" />,
    description: "Write and reflect on your day.",
    path: "/me-time/reflection",
  },
];

export default function MeTime() {
  return (
    <div className="max-w-5xl mx-auto px-4 mt-10">
      <h1 className="text-3xl md:text-4xl font-serif text-center text-softBrown mb-10">
        MeTime 🧘‍♀️
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Link
            to={feature.path}
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 hover:border-rose-200"
          >
            <div className="flex items-center gap-4 mb-2">
              {feature.icon}
              <h3 className="text-xl font-semibold text-softBrown">{feature.title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
