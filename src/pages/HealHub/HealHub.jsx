import { Link } from "react-router-dom";
import { FaHeartbeat, FaBookOpen , FaHeadphones , FaSmile } from "react-icons/fa";

const features = [
  {
    title: "Breathing Exercise",
    description: "Calm your mind with guided breathing.",
    icon: <FaHeartbeat className="text-2xl text-blue-500" />,
    link: "/healhub/breathing",
  },
  {
    title: "Emotion Journal",
    description: "Reflect and track your emotional journey.",
    icon: <FaBookOpen className="text-2xl text-pink-500" />,
    link: "/healhub/emotion-journal",
  },
  {
    title: "Meditation Audio",
    description: "Listen to guided meditation tracks.",
    icon: <FaHeadphones className="text-2xl text-purple-500" />,
    link: "/healhub/meditation-audio",
  },
  {
  title: "Positive Affirmations",
  description: "Read uplifting affirmations to feel better.",
  icon: <FaSmile className="text-2xl text-yellow-500" />,
  link: "/healhub/affirmations",
},

];

export default function HealHub() {
  return (
    <div className="max-w-5xl mx-auto px-4 mt-10">
      <h1 className="text-3xl md:text-4xl font-serif text-center text-softBrown mb-10">
        HealHub 💖
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Link to={feature.link} key={index}>
            <div className="bg-white hover:bg-softCream transition p-6 rounded-xl shadow-md cursor-pointer border border-gray-100 hover:border-rose-200">
              <div className="flex items-center gap-4 mb-2">
                {feature.icon}
                <h3 className="text-xl font-semibold text-softBrown">{feature.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </Link>
        ))}
        

      </div>
    </div>
  );
}
