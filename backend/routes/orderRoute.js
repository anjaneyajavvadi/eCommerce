import express from "express";
import { placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateOrderStatus } from "../controllers/OrderController";
import adminAUth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";
const orderRouter= express.Router();

//user routes
orderRouter.post("/placeorder",userAuth,placeOrder);
orderRouter.post("/placeOrder-stripe",userAuth,placeOrderStripe);
orderRouter.post("/placeOrder-razorpay",userAuth,placeOrderRazorpay);
orderRouter.get("/userOrders",userAuth,userOrders);

//Admin routes
orderRouter.get("/allOrders",adminAUth,allOrders);
orderRouter.put("/updateOrderStatus",adminAUth,updateOrderStatus);

export default orderRouter;