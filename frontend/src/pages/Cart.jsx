import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import { useEffect } from "react";
import Title from "../components/Title";
import CartItem from "../components/CartItem";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    removeFromCart
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  // Build cartData from cartItems
  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItems[productId][size]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      {/* Title */}
      <div className="text-2xl mb-3">
        <Title text1={'Your'} text2={'Cart'} />
      </div>

      {/* Cart Items */}
      <div>
        {cartData.map((item) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <CartItem
              key={`${item._id}-${item.size}`} // ✅ stable key fixes the bug
              productData={productData}
              item={item}
              currency={currency}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          );
        })}
      </div>


      {/* Cart Summary */}
      {cartData.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal/>
            <div className="w-full text-end">
              <button
                onClick={() => navigate('/place-order')}
                className="bg-black text-white text-sm my-8 px-8 py-3"
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;