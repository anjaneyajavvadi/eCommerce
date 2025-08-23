import React, { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";

const Verify = () => {
  const { navigate, token, backendUrl, setCartItems } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        backendUrl + "/api/order/verifyStripePayment",
        { success: success === "true", orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);

      if (response.data.success) {
        setCartItems({});
        navigate("/success"); // Payment succeeded
      } else {
        navigate("/cart");
        console.log(response.data.message); // Payment canceled or failed
      }

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
  if (orderId) verifyPayment();
}, [success, orderId, token]);


  if (!showSuccess) return <div></div>;

};

export default Verify;
