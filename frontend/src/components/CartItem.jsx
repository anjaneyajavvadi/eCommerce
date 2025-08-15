import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { assets } from '../assets/assets';
import CartTotal from './CartTotal';

// ----------------- Cart Item Component -----------------
const CartItem = ({ productData, item, currency, updateQuantity, removeFromCart }) => {
  const [localQuantity, setLocalQuantity] = useState(item.quantity);

  return (
    <div
      className="border-t py-4 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
    >
      {/* Product Info */}
      <div className="flex items-start gap-6">
        <img
          src={productData.image[0]}
          alt={productData.name}
          className="w-16 sm:w-20"
        />
        <div className="flex flex-col">
          <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
          <div className="flex gap-5 mt-2 text-sm text-gray-600">
            <p>
              {currency}
              {productData.price}
            </p>
            <p className="px-2 sm:px-3 sm:py-1 bg-slate-200">{item.size}</p>
          </div>
        </div>
      </div>

      {/* Quantity Input */}
      <input
          type="number"
          value={localQuantity}
          onChange={(e) => setLocalQuantity(Number(e.target.value))}
          onBlur={() => {
            if (localQuantity === 0) {
              removeFromCart(item._id, item.size);
            } else if (localQuantity !== item.quantity) {
              updateQuantity(item._id, item.size, localQuantity);
            }
          }}
          className="max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
        />


      {/* Delete Icon */}
      <img
        onClick={() => removeFromCart(item._id, item.size)}
        src={assets.bin_icon}
        alt="delete"
        className="w-4 mr-4 sm:w-5 cursor-pointer"
      />
    </div>
  );
};

export default CartItem;