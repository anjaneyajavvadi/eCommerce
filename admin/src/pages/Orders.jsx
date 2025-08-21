import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';

const Orders = ({ token }) => {
  const { orders, fetchAllorders, list, fetchList, currency,backendUrl } = useContext(AdminContext);

  useEffect(() => {
    fetchAllorders();
    fetchList();
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try{
      const response = await axios.put(`${backendUrl}/api/order/updateOrderStatus/${orderId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllorders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
    }
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-bold'>Orders</h1>
      <div>
        {orders.map((order) => (
          <div key={order._id} className="border p-4 mb-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <img className="w-8 h-8" src={assets.parcel_icon} alt="" />
              <h4 className="font-bold">Order ID: {order._id}</h4>
            </div>

            {/* ✅ Grid Layout Instead of Flex */}
            <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr_1fr_1fr] gap-3 items-start">
              {/* Products + Address */}
              <div className="flex flex-col">
                {order.products.map((product, index) => {
                  const productDetails = list.find(p => p._id === product.productId);
                  return (
                    <div key={index} className='mt-0 text-sm'>
                      {productDetails?.name} x {product.quantity} {product.size}
                    </div>
                  );
                })}
                <strong>Address</strong>
                <p className='text-sm'>{order.address.firstName+" "+order.address.lastName}</p>
                <p className='text-sm'>{order.address.email}</p>
                <p className='text-sm'>{order.address.street}</p>
                <p className='text-sm'>{order.address.city+" "+order.address.state+" "+order.address.country}</p>
              </div>

              {/* Order Details */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <strong>Items:</strong>
                  <p className="text-sm">{order.products.length}</p>
                </div>
                <div className="flex items-center gap-2">
                  <strong>Method:</strong>
                  <p className="text-sm">{order.paymentMethod==="cod" ? "Cash On Delivery" : "Online"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <strong>Payment Status:</strong>
                  <p className="text-sm">{String(order.payment) === "true" ? "Paid" : "Unpaid"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <strong>Date:</strong>
                  <p className="text-sm">{order.createdAt.split("T")[0]}</p>
                </div>
              </div>

              {/* Total */}
              <div>
                <div className="flex items-center gap-2">
                  <strong>Total:</strong>
                  <p className="text-sm">{currency}{order.totalAmount}</p>
                </div>
              </div>

              {/* Status Dropdown */}
              <div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Prder placed">Order Placed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
