import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const orderTime = new Date().toLocaleString();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 3000); // redirect after 3s
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800">
      {/* Success Circle */}
      <div className="relative w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-2xl animate-bounce">
        <svg
          className="w-16 h-16 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Text */}
      <h1 className="text-3xl font-bold mt-6 text-gray-800">
        Order Placed Successfully 🎉
      </h1>
      <p className="mt-2 text-lg text-gray-600">Order time: {orderTime}</p>
      <p className="mt-1 text-sm text-gray-500 opacity-80">
        Redirecting to your orders...
      </p>
    </div>
  );
};

export default SuccessPage;
