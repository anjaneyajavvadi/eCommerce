import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';

const Orders = ({token}) => {
  
  const {orders,fetchAllorders,list,fetchList,currency}=useContext(AdminContext);

  useEffect(() => {
    fetchAllorders();
    fetchList();
  }, [token]);

  return (

    <div>
      
      <h1 className='text-2xl font-bold '>Orders</h1>
      <div>
        {orders.map((order) => (
          <div key={order._id} className="border cursor-pointer p-4 mb-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <img className="w-8 h-8" src={assets.parcel_icon} alt="" />
              <h4 className="font-bold">Order ID: {order._id}</h4>
            </div>

            {/* Order Products */}
            <div className="flex flex-col gap-4">
              {order.products.map((product, index) => {
                const productDetails = list.find(p => p._id === product.productId);

                return (
                  <div key={index} className="flex items-center gap-5 border-b pb-2">
                    {productDetails ? (
                      <>
                        <img
                          src={productDetails.image[0]}
                          alt={productDetails.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex flex-col">
                          <strong>{productDetails.name}</strong>
                          <span>Qty: {product.quantity}</span>
                          <span>Size: {product.size}</span>
                          <span>Price: {currency}{product.price}</span>
                        </div>
                      </>
                    ) : (
                      <>Product ID: {product.productId}</>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Order Total */}
            <div className="flex justify-end mt-3">
              <strong className="text-lg">
                Total: {currency}{order.totalAmount}
              </strong>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Orders;