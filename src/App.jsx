import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VisionBoard from "./pages/VisionBoard";
import MeTime from "./pages/MeTime/metime";
import { Toaster } from "react-hot-toast";
import MoodPage from "./pages/MeTime/MoodPage";
import ActivitiesPage from "./pages/MeTime/ActivitiesPage";
import TimerPage from "./pages/MeTime/TimerPage";
import ReflectionLog from "./components/MeTime/ReflectionLog";
import BreathingPage from "./pages/HealHub/BreathingPage";
import EmotionJournalPage from "./pages/HealHub/EmotionJournalpage";
import HealHub from "./pages/HealHub/HealHub";
import MeditationAudio from "./components/HealHub/MeditationAudio";
import PositiveAffirmations from "./components/HealHub/Affirmations";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (

    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster position="top-right" />

      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-4">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/vision-board" element={<VisionBoard />} />
            <Route path="/me-time" element={<MeTime />} />
            <Route path="/heal-hub" element={<HealHub />} />
            <Route path="/me-time/mood" element={<MoodPage />} />
            <Route path="/me-time/activities" element={<ActivitiesPage />} />
            <Route path="/me-time/timer" element={<TimerPage />} />
            <Route path="/me-time/reflection" element={<ReflectionLog />} />
            <Route path="/healhub/emotion-journal" element={<EmotionJournalPage />} />
            <Route path="/healhub/breathing" element={<BreathingPage />} />
            <Route path="/healhub/meditation-audio" element={<MeditationAudio />} />
            <Route path="/healhub/affirmations" element={<PositiveAffirmations />} />

          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Placeholder({ name }) {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <h1 className="text-2xl font-serif">{name} Coming Soon ✨</h1>
    </div>
  );
}

export default App;
