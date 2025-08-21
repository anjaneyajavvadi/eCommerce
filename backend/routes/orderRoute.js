import express from "express";
import { placeOrder,verifyStripePayment,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateOrderStatus } from "../controllers/orderController.js";
import adminAUth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";
const orderRouter= express.Router();

//user routes
orderRouter.post("/placeorder",userAuth,placeOrder);
orderRouter.post("/placeorder-stripe",userAuth,placeOrderStripe);
orderRouter.post("/verifyStripePayment",userAuth,verifyStripePayment);
orderRouter.post("/placeorder-razorpay",userAuth,placeOrderRazorpay);
orderRouter.get("/userorders",userAuth,userOrders);

//Admin routes
orderRouter.get("/allorders",adminAUth,allOrders);
orderRouter.put("/updateOrderStatus/:orderId",adminAUth,updateOrderStatus);

export default orderRouter;