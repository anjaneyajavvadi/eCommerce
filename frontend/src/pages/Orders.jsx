import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = () => {
  const { backendUrl, currency, token, products } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/order/userOrders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setOrderData(response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="pt-14">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orderData && orderData.length > 0 ? (
          orderData.map((order) => (
            <div
              key={order._id}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div className="flex flex-col gap-4 w-full">
                {/* Products in this order */}
                {order.products.map((prod, index) => {
                  const productDetails = products.find(
                    (p) => p._id === prod.productId
                  );

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-6 text-sm"
                    >
                      {/* Product Image */}
                      {productDetails && (
                        <img
                          src={
                            Array.isArray(productDetails.image)
                              ? productDetails.image[0]
                              : productDetails.image
                          }
                          alt={productDetails.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}

                      {/* Product Info */}
                      <div>
                        <p className="sm:text-base font-medium">
                          {productDetails?.name || "Unknown Product"}
                        </p>

                        <div className="flex items-center gap-3 text-base text-gray-700">
                          <p className="text-lg">
                            {currency}
                            {prod.price}
                          </p>
                          <p>Quantity: {prod.quantity || 1}</p>
                          <p>Size: {prod.size || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Order Info */}
                <p className="mt-2">
                  Date:{" "}
                  <span className="text-gray-400">
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : "Not available"}
                  </span>
                </p>

                <div className="md:w-1/2 flex justify-between mt-3 md:mt-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <p className="text-sm md:text-base">
                      {order.status || "Ready to ship"}
                    </p>
                  </div>
                  <button className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100 transition">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-2xl text-center mt-10">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
