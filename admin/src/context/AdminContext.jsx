import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// 1. Create context
export const AdminContext = createContext();

// 2. Create provider
export const AdminContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); 
  const [token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token"):"");

  const [list, setList] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency="₹";
      const fetchList=async()=>{
          try{
              const response=await axios.get(backendUrl+"/api/product/list",{headers:{token}});
              if(response.data.success){
                  setList(response.data.products);
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
  
      const removeProduct=async(id)=>{
          try{
              const response=await axios.delete(backendUrl+"/api/product/remove/"+id,{headers:{token}}); 
              if(response.data.success){
                  toast.success(response.data.message);
                  await fetchList();
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
  const [orders, setOrders] = useState([]);
  
    const fetchAllorders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/order/allorders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setOrders(response.data.orders);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message || "Failed to fetch orders");
        }
      } catch (e) {
        console.error(e);
        toast.error(e.response?.data?.message || "Something went wrong");
      }
    };

  const value = { admin, setAdmin ,token,setToken,list,fetchList,removeProduct,currency,backendUrl,orders,fetchAllorders}; // context value

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
