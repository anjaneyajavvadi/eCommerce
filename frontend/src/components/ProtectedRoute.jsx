import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(ShopContext);

  if (!token) {
    // If not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default ProtectedRoute;