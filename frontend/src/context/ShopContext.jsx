import { createContext, useEffect, useState} from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext=createContext();

const ShopContextProvider=(props)=>{

    const currency='₹';
    const delivery_fee=50;
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch]=useState('');
    const [products,setProducts]=useState([]);
    const [showSearch,setShowSearch]=useState(false); 

    const [cartItems,setCartItems]=useState({});
    const [token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token"):"");
    const navigate=useNavigate();
    const location=useLocation();

    const getCartAmount=()=>{
        let totalAmount=0;

        for(const items in cartItems){
            let itemInfo=products.find((product)=>product._id===items);
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalAmount+=itemInfo.price * cartItems[items][item];
                    }
                } catch(err){

                }
            }
        }
        return totalAmount;
    }
    const addToCart = async(itemId, size) => {
        if(!size) {
            toast.error('please select a size');
            return;
        }

        let cartData = structuredClone(cartItems);
        
        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if(token) {
            try {
                console.log('Sending to backend:', { itemId, size }); // Add this
                
                const response = await axios.post(`${backendUrl}/api/cart/add`, {itemId, size},{
                headers: { Authorization: `Bearer ${token}` }
                });
                
                console.log('Backend response:', response.data); // Add this
                
                if(!response.data.success) {
                    toast.error(response.data.message);
                } else {
                    toast.success(response.data.message);
                }
            } catch(err) {
                console.log('Error details:', err);
                console.log('Error response:', err.response?.data); 
                toast.error(err.response?.data?.message || 'Something went wrong');
            }
        } else {
            console.log('No token found - user not logged in'); 
        }
    };
    

    const getCartCount=()=>{
        let totalCount=0;
        for(const items in cartItems){
            for(const item in cartItems[items])
            {
                try{
                    if(cartItems[items][item]>0){
                        totalCount+=cartItems[items][item];
                    }
                }catch(e){

                }
                }
            }
            return totalCount;
        };
        const removeFromCart=async(itemId,size)=>{
            let cartData=structuredClone(cartItems);
            delete cartData[itemId][size];
            setCartItems(cartData);

            if(token){
                try{
                    const response=await axios.delete(`${backendUrl}/api/cart/remove`,{
                        headers:{Authorization:`Bearer ${token}`},
                        data:{itemId,size}
                    });
                    if(!response.data.success){
                        toast.error(response.data.message);
                    }
                    else{
                        toast.success(response.data.message);
                    }
                }
                catch(err){
                    console.log(err);
                    toast.error(err.response.data.message);
                }
            }
        }

        const updateQuantity=async(itemId,size,quantity)=>{
            let cartData=structuredClone(cartItems);
            cartData[itemId][size]=quantity;
            setCartItems(cartData);

            if(token){
                try{
                    console.log({itemId,size,quantity});
                    const response=await axios.put(`${backendUrl}/api/cart/update`,{itemId,size,quantity},{
                        headers:{Authorization:`Bearer ${token}`}
                    });
                    if(!response.data.success){
                        toast.error(response.data.message);
                    }
                    else{
                        toast.success(response.data.message);
                    }
                }
                catch(err){
                    console.log(err);
                    toast.error(err.response.data.message);
                }
            }
        }
        
        const fetchProducts=async()=>{
            try{
                const response=await axios.get(backendUrl+"/api/product/list");
                if(response.data.success){
                    setProducts(response.data.products);
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

        const loadCartData=async(token)=>{
            if(token){
                try{
                    const response=await axios.get(`${backendUrl}/api/cart/list`,{
                        headers:{Authorization:`Bearer ${token}`}
                    });
                    console.log(response.data.cart);
                    if(response.data.success){
                        setCartItems(response.data.cart);
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
        }

        useEffect(()=>{
            loadCartData(token);
        },[token]);

        useEffect(()=>{
            fetchProducts();
        },[])

    const value={
        products , 
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        getCartCount,
        cartItems,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        location,
        removeFromCart
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;