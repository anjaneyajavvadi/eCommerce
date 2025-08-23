import { useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";

const NewAddressBox = () => {
  const { formData, setFormData } = useContext(ShopContext);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
      <div className='text-xl sm:text-2xl my-3'>
        <Title text1={'DELIVERY'} text2={'ADDRESS'} />
      </div>
      <div className='flex gap-3'>
        <input onChange={handleInputChange} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First Name' required />
        <input onChange={handleInputChange} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last Name' required />
      </div>
      <input onChange={handleInputChange} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email Address' required />
      <input onChange={handleInputChange} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' required />
      <div className='flex gap-3'>
        <input onChange={handleInputChange} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' required />
        <input onChange={handleInputChange} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' required />
      </div>
      <div className='flex gap-3'>
        <input onChange={handleInputChange} name='zipCode' value={formData.zipCode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Zip Code' required />
        <input onChange={handleInputChange} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' required />
      </div>
      <input onChange={handleInputChange} name='phoneNumber' value={formData.phoneNumber} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone' required />
    </div>
  )
};

export default NewAddressBox