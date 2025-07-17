import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

const app=express();

const port=process.env.PORT || 5000;
connectDb();
connectCloudinary();

app.use(cors());
app.use(express.json());

app.use('/api/user',userRouter);

app.get('/',(req,res)=>{
    res.send("API WORKING");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})