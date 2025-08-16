import orderModel from "../models/orderModel.js";

const placeOrder=async(req,res)=>{
    try{
        const {userId,items,amount,address}=req.body;

        const orderData = {
            userId,
            orderData: {   // 👈 wrap inside orderData
                items,
                amount,
                address
            },
            paymentMethod: "cod",
            payment: false,
            status: "Order Placed",
            date: Date.now()
        };

        const newOrder=new orderModel(orderData);
        await newOrder.save();
        res.json({success:true,message:"Order Placed Successfully"});
        await userModel.findByIdAndUpdate(userId,{cartData:{}});
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Internal Server Error"});
    }


}

const placeOrderStripe=async(req,res)=>{

}

const placeOrderRazorpay=async(req,res)=>{

}

//for admin panel
const allOrders=async(req,res)=>{

}

const userOrders=async(req,res)=>{
    
}
const updateOrderStatus=async(req,res)=>{

}
export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateOrderStatus}