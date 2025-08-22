import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import Stripe from 'stripe';

const currency = "inr";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;

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
          price: productPrice,
        };
      })
    );

    const newOrder = new orderModel({
      userId,
      products: orderProducts,
      totalAmount: amount || totalAmount,
      address,
      paymentMethod: paymentMethod || "cod", // dynamically from frontend
      payment: paymentMethod === "cod" ? false : true,
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
  try{
      const { userId, items, amount, address} = req.body;
      const {origin}=req.headers;

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
          price: productPrice,
        };
      })
    );

      const newOrder = new orderModel({
      userId,
      products: orderProducts,
      totalAmount: amount || totalAmount,
      address,
      paymentMethod: "stripe", // dynamically from frontend
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    });

    await newOrder.save();

    const line_items=items.map((item)=>{
      return{
        price_data:{
          currency:currency,
          product_data:{
            name:item.name,
            images:[item.image]
          },
          unit_amount:item.price*100
        },
        quantity:item.quantity
      }
    })

    line_items.push({
      price_data:{
        currency:currency,
        product_data:{
          name:'Shipping Charges',
        },
        unit_amount:50*100,
      },
      quantity:1
    })
  
    const session=await stripe.checkout.sessions.create({
      success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode:'payment',
    })

    res.json({success:true,sessionUrl:session.url});

  }catch(err){
    console.log(err);
    res.json({success:false, message:"Internal Server Error"});
  }
}
const verifyStripePayment=async(req,res)=>{
  try{
    const {orderId,success,userId}=req.body;
    console.log("server got hit verfying");
    

    if(success){
      const order=await orderModel.findById(orderId);
      order.payment=true;
      await order.save();
      const user=await userModel.findById(userId);
      
      user.cartData={};
      
      await user.save();
      res.json({success:true});
    }
    else
    {
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false});
    }
  }catch(err){
    console.log(err);
    res.json({success:false, message:"Internal Server Error"});
  }
}

//for admin panel
const allOrders=async(req,res)=>{
    try{
      
      const orders=await orderModel.find({});
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
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Internal Server Error"});
    }
}


const updateOrderStatus=async(req,res)=>{
  try{
    const orderId=req.params.orderId;
    const status=req.body.status;
    const updatedOrder=await orderModel.findByIdAndUpdate(orderId,{status:status},{new:true});
    res.json({success:true,updatedOrder});
  }catch(err){
    console.log(err);
    res.json({success:false, message:"Internal Server Error"});
  }
}
export {placeOrder,placeOrderStripe,verifyStripePayment,allOrders,userOrders,updateOrderStatus}