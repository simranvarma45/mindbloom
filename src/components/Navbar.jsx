// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  

  return (
    <nav className="bg-lightPeach py-4 px-6 shadow-md rounded-b-2xl relative flex items-center justify-center">
      {/* Centered Title */}

      <h1 className="text-2xl font-serif font-bold text-green-900">
        MindBloom
      </h1>

      {/* Right Side Buttons */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex gap-3">
        {loggedIn ? (
          <button
            onClick={() => logoutUser(navigate)}
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
