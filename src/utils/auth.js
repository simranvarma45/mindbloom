// utils/auth.js

// ✅ Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// ✅ Check if user is logged in
export const isLoggedIn = () => {
  return !!getToken();
};

// ✅ Logout and redirect
export const logoutUser = (navigate) => {
  localStorage.removeItem("token");
  navigate("/login");
};
