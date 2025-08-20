import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    // items = [{ productId, quantity, size }]

    let totalAmount = 0;

    const orderProducts = await Promise.all(
      items.map(async (item) => {
        const product = await productModel.findById(item.productId);
        if (!product) throw new Error("Product not found");

        const productPrice = product.price;
        totalAmount += productPrice * item.quantity;

        return {
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          price: productPrice, // snapshot price
        };
      })
    );

    const newOrder = new orderModel({
      userId,
      products: orderProducts,
      totalAmount: amount || totalAmount, // use passed amount or calculate
      address,
      paymentMethod: "cod",
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    });

    await newOrder.save();

    // Clear user cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed Successfully", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const placeOrderStripe=async(req,res)=>{

}

const placeOrderRazorpay=async(req,res)=>{

}

//for admin panel
const allOrders=async(req,res)=>{
    try{
      
      const orders=await orderModel.find({});
      console.log(orders);
      res.json({success:true,orders});
    }catch(err){
      console.log(err);
      res.json({success:false, message:"Internal Server Error"});
    }
}

const userOrders=async(req,res)=>{
    try{
        const userId=req.body.userId;
        const orders=await orderModel.find({userId:userId});
        res.json({success:true,orders});
        console.log(orders);
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Internal Server Error"});
    }
}
const updateOrderStatus=async(req,res)=>{

}
export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateOrderStatus}