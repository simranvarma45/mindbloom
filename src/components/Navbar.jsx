import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn, logoutUser } from "../utils/auth";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  // Listen for login/logout auth changes
  useEffect(() => {
    const checkAuth = () => setLoggedIn(isLoggedIn());
    checkAuth();
    window.addEventListener("authChanged", checkAuth);
    return () => window.removeEventListener("authChanged", checkAuth);
  }, []);

  const handleRedirect = (path) => {
    localStorage.setItem("redirectAfterLogin", location.pathname);
    navigate(path);
  };

  const handleLogout = () => {
    logoutUser();
    setLoggedIn(false);
    toast.success("You’ve been logged out 🌱");
    navigate("/"); // Redirect to home
  };

  return (
    <nav className="bg-lightPeach py-4 px-6 shadow-md rounded-b-2xl relative flex items-center justify-center">
      <h1 className="text-2xl font-serif font-bold text-green-900">MindBloom</h1>

      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex gap-3">
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 px-4 py-1.5 rounded-full text-sm font-medium shadow transition duration-300"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => handleRedirect("/login")}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Login
            </button>
            <button
              onClick={() => handleRedirect("/signup")}
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
