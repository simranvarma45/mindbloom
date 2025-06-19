import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn, logoutUser } from "../utils/auth";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  // ✅ Sync login/logout/signup changes
  useEffect(() => {
    const checkAuth = () => setLoggedIn(isLoggedIn());

    checkAuth(); // run on mount
    window.addEventListener("authChanged", checkAuth); // 🔁 listen to auth events

    return () => window.removeEventListener("authChanged", checkAuth);
  }, []);

  const handleLogout = () => {
    logoutUser(); // 🔁 includes event dispatch
    setLoggedIn(false);
    toast.success("You’ve been logged out 🌱");
  };

  return (
    <nav className="bg-lightPeach py-4 px-6 shadow-md rounded-b-2xl relative flex items-center justify-center">
      <h1 className="text-2xl font-serif font-bold text-green-900">
        MindBloom
      </h1>

      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex gap-3">
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-green-700 hover:text-green-900 text-sm"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
