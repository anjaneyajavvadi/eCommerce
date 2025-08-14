import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {
    const [image1,setImage1]=useState(false);
    const [image2,setImage2]=useState(false);
    const [image3,setImage3]=useState(false);
    const [image4,setImage4]=useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [sizes, setSizes] = useState([]);
    const [bestSeller, setBestSeller] = useState(false);

    const onSubmitHandler=async(event)=>{
        event.preventDefault();
        try{
            const formData=new FormData();
            formData.append("name",name);
            formData.append("description",description);
            formData.append("price",price);
            formData.append("category",category);
            formData.append("subCategory",subCategory);
            formData.append("sizes",JSON.stringify(sizes));
            formData.append("bestSeller",String(bestSeller));
            image1 && formData.append("image1",image1);
            image2 && formData.append("image2",image2);
            image3 && formData.append("image3",image3);
            image4 && formData.append("image4",image4);
            const response=await axios.post(backendUrl+"/api/product/add",formData,{headers:{token}});
            if(response.data.success){
                toast.success(response.data.message);
                setName("");
                setDescription("");
                setPrice("");
                setCategory("Men");
                setSubCategory("Topwear");
                setSizes([]);
                setBestSeller(false);
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);

            }
            else{
                toast.error(response.data.message);
            }
        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.message);
        }
    }
  return (
    <form className='flex flex-col w-full gap-3 ml-[3%]'>
        <div>
            <p className='mb-2'>Upload Images</p>
            <div className='flex gap-2'>
                <label htmlFor='image1'>
                    <img className='w-20 cursor-pointer' src={image1?URL.createObjectURL(image1):assets.upload_area} alt=""/>
                    <input onChange={(e)=>setImage1(e.target.files[0])} type='file' className='hidden' id='image1'/>
                </label>
                <label htmlFor='image2'>
                    <img className='w-20 cursor-pointer' src={image2?URL.createObjectURL(image2):assets.upload_area} alt=""/>
                    <input onChange={(e)=>setImage2(e.target.files[0])} type='file' className='hidden' id='image2'/>
                </label>
                <label htmlFor='image3'>
                    <img className='w-20 cursor-pointer' src={image3?URL.createObjectURL(image3):assets.upload_area} alt=""/>
                    <input onChange={(e)=>setImage3(e.target.files[0])} type='file' className='hidden' id='image3'/>
                </label>
                <label htmlFor='image4'>
                    <img className='w-20 cursor-pointer' src={image4?URL.createObjectURL(image4):assets.upload_area} alt=""/>
                    <input onChange={(e)=>setImage4(e.target.files[0])} type='file' className='hidden' id='image4'/>
                </label>
            </div>
        </div>
        <div className='w-full'>
            <p className='mb-2'>Product Name</p>
            <input type='text'onChange={(e)=>setName(e.target.value)} value={name} placeholder='Product Name' className='w-full max-w-[500px] px-3 py-2' required/>
        </div>
        <div className='w-full'>
            <p className='mb-2'>Product Description</p>
            <textarea onChange={(e)=>setDescription(e.target.value)} value={description} type='text' placeholder='Describe your product' className='w-full max-w-[500px] px-3 py-2' required/>
        </div>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <div>
                <p className='mb-2'>Product Category</p>
                <select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full px-2 py-3'>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                </select>
            </div>
            <div>
                <p className='mb-2'>Product SubCategory</p>
                <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className='w-full px-2 py-3'>
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                </select>
            </div>
            <div>
                <p className='mb-2'>Product Price</p>
                <input onChange={(e)=>setPrice(e.target.value)} value={price} type='number' placeholder='250' className='w-full sm:w-[120px] px-3 py-2'required/>
            </div>
        </div>
        <div>
            <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-2'>
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <div
                    key={size}
                    onClick={() => {
                        setSizes(prev =>
                        prev.includes(size)
                            ? prev.filter(s => s !== size) 
                            : [...prev, size] 
                        );
                    }}
                    >
                    <p
                        className={`px-3 py-3 cursor-pointer ${
                        sizes.includes(size) ? 'bg-black text-white' : 'bg-slate-200'
                        }`}
                    >
                        {size}
                    </p>
                    </div>
                ))}
                </div>

        </div>
        <div className='flex gap-2 mt-2'>
            <input onChange={(e)=>setBestSeller(prev=>!prev)} checked={bestSeller} type="checkbox" id="bestseller" name="bestseller"/>
            <label className="cursor-pointer"htmlFor="bestseller">Bestseller</label>
        </div>
        <button onClick={onSubmitHandler} className='bg-black text-white font-light w-58 text-xs px-8 py-2 mt-4'>Add Product</button>
    </form>
  )
}

export default Add