import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import orderModel from "./models/orderModel.js";
import addressRouter from "./routes/addressRoute.js";
import userModel from "./models/userModel.js";


const app=express();

const port=process.env.PORT || 5000;
connectDb();
connectCloudinary();

app.use(cors());
app.use(express.json());

app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/address',addressRouter);

app.get('/',(req,res)=>{
    res.send("API WORKING");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})