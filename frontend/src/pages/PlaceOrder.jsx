import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const PlaceOrder = () => {
  const [method,setMethod]=useState('cod');
  const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products,setOrderInProgress}=useContext(ShopContext);

  const [formData,setFormData]=useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
  });

  const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    setOrderInProgress(true);
    let items = [];

    // Build items array
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
        orderData.paymentMethod="cod";
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
        const responseStripe=await axios.post(`${backendUrl}/api/order/placeorder-stripe`,orderData,{headers:{Authorization:`Bearer ${token}`}});
        if(responseStripe.data.success){
          const {sessionUrl}=responseStripe.data;
          window.location.replace(sessionUrl);
        }
        else{
          toast.error(responseStripe.data.message);
        }
        break;

      default:
        break;
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong while placing order");
  }
  finally{
    setOrderInProgress(false);
  }
};



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'ADDRESS'}></Title>
        </div>
        <div className='flex gap-3'>
          <input onChange={handleInputChange} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py1.5 px-3.5 w-full' type='text' placeholder='First Name' required></input>
          <input onChange={handleInputChange} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py1.5 px-3.5 w-full' type='text' placeholder='Last Name' required></input>
        </div>
        <input onChange={handleInputChange} name='email' value={formData.email} className='border border-gray-300 rounded py1.5 px-3.5 w-full' type='email' placeholder='Email Address' required></input>
        <input onChange={handleInputChange} name='street' value={formData.street} className='border border-gray-300 rounded py1.5 px-3.5 w-full' type='text' placeholder='Street' required></input>
        <div className='flex gap-3'>
          <input onChange={handleInputChange} name='city' value={formData.city}   className='border border-gray-300 rounded py1.5 px-3.5 w-full' type='text' placeholder='City' required></input>
          <input onChange={handleInputChange} name='state' value={formData.state} className='border border-gray-300 rounded py1.5 px-3.5 w-full' type='text' placeholder='State' required></input>
        </div>
        <div className='flex gap-3'>
          <input onChange={handleInputChange} name='zip' value={formData.zip} className='border border-gray-300 rounded py1.5 px-3.5 w-full' type='number' placeholder='Zip Code' required></input>
          <input onChange={handleInputChange} name='country' value={formData.country} className='border border-gray-300 rounded py1.5 px-3.5 w-full' type='text' placeholder='Country' required></input>
        </div>
        <input onChange={handleInputChange} name='phone' value={formData.phone} className='border border-gray-300 rounded py1.5 px-3.5 w-full' type='number' placeholder='Phone' required></input>
      </div>
      {/*---------right side ----*/}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}></Title>
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border-2 p-2 px-3 cursor-pointer'>
              <p  className={`min-w-3.5 h-3.5 border rounded-full  ${method==='stripe'?'bg-green-400':''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border-2 p-2 px-3 cursor-pointer'>
              <p  className={` min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-green-400':''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}
export default PlaceOrder