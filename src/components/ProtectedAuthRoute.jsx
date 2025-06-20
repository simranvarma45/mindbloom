import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function ProtectedAuthRoute({ children }) {
  const location = useLocation();
  const token = isLoggedIn();

  if (token) {
    const redirectTo = localStorage.getItem("redirectAfterLogin") || "/";
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
