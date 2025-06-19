

//  Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

//  Check if user is logged in
export const isLoggedIn = () => {
  return !!getToken();
};

// Logout 
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName"); 
  localStorage.removeItem("userId");   
  
};
window.dispatchEvent(new Event("authChanged"));
