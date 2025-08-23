import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import Addresses from "../components/Addresses";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    setOrderInProgress,
    formData,
    setFormData,
    profileData
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");

  const selectAddressHandler = (address) => {
    const nameParts = address.name.split(" ");
    const firstName = nameParts[0]; // first word
    const lastName = nameParts.slice(1).join(" ");
  
  setFormData({
    firstName: firstName,
    lastName: lastName,
    email: profileData.email ,
    street: address.street,
    city: address.city ,
    state: address.state ,
    zipCode: address.zipCode,
    country: address.country ,
    phoneNumber: address.phoneNumber,
  });
};
  useEffect(() => {
  console.log("Updated formData:", formData);
}, [formData]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setOrderInProgress(true);
      let items = [];


      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const product = products.find((p) => p._id === productId);
          if (product) {
            items.push({
              productId: product._id,
              name: product.name,
              image: product.image[0],
              price: product.price,
              size,
              quantity: cartItems[productId][size],
            });
          }
        }
      }

      const orderData = {
        items,
        amount: getCartAmount() + delivery_fee,
        address: formData,
      };

      switch (method) {
        case "cod":
          orderData.paymentMethod = "cod";
          orderData.payment = false;
          const response = await axios.post(
            `${backendUrl}/api/order/placeorder`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data.success) {
            toast.success(response.data.message);
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/placeorder-stripe`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (responseStripe.data.success) {
            const { sessionUrl } = responseStripe.data;
            window.location.replace(sessionUrl);
          } else {
            window.location.replace(response.data.sessionUrl)
            toast.error(responseStripe.data.message);
          }
          break;

        default:
          break;
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while placing order");
    } finally {
      setOrderInProgress(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      <Addresses checkout selectAddress={selectAddressHandler} />

      {/* Right: Cart Total & Payment */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border-2 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border-2 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
