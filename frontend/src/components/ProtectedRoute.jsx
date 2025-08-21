import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const ProtectedRoute = ({ children }) => {
  const { orderInProgress } = useContext(ShopContext);

  if (!orderInProgress) {
    // If no order in progress, redirect to home or cart
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
