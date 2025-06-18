import { Link } from "react-router-dom";
import BackgroundBlobs from "../components/BackgroundBlobs";


export default function Home() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[80vh] text-center px-4 overflow-hidden">
      {/* 🌸 Background Blobs */}
      <BackgroundBlobs />

      <h2 className="text-4xl md:text-5xl font-serif font-semibold text-earthText mb-6 z-10">
        Welcome to Peace 🌸
      </h2>

      <p className="text-lg md:text-xl italic text-softBrown max-w-xl mb-8 z-10">
        "I choose peace over pressure, progress over perfection."
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 w-full max-w-4xl z-10">
        <FeatureCard name="Vision Board" link="/vision-board" emoji="🖼️" />
        <FeatureCard name="Me Time" link="/me-time" emoji="🌙" />
        <FeatureCard name="Heal Hub" link="/heal-hub" emoji="💖" />
      </div>
    </div>
  );
}


function FeatureCard({ name, link, emoji }) {
  return (
    <Link
      to={link}
      className="bg-lightPeach rounded-2xl shadow-md hover:shadow-lg p-6 transition-all duration-200 hover:scale-105"
    >
      <div className="text-4xl mb-2">{emoji}</div>
      <div className="text-lg font-medium text-earthText">{name}</div>
    </Link>
  );
}

