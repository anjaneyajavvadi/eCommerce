import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
const loginUser=async(req,res)=>{
    const {email,password}=req.body;

    const user=await userModel.findOne({email});
    if(!user){
        return res.json({success:false, message:"Invalid Credentials"});
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.json({success:false, message:"Invalid Credentials"});
    }

    const token=generateToken(user._id);

    res.json({success:true,token, message:"User logged in successfully"});
}

const registerUser=async(req,res)=>{
    try{
            const {name,email,password}=req.body;
            
            //check if user already exists
            const exists=await userModel.findOne({email});
            if(exists){
                return res.json({success:false, message:"User already exists"});
            }

            if(!validator.isEmail(email)){
                return res.json({success:false, message:"Please enter a valid email"});
            }
            if(password.length<8){
                return res.json({success:false, message:"Password must be at least 8 characters long"});
            }

            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);

            const newUser=new userModel({name,email,password:hashedPassword});
            const user=await newUser.save();

            const token=generateToken(user._id);

            res.json({success:true,token, message:"User registered successfully"});
        }catch(err){
            console.log(err);
            res.json({success:false, message:"Internal Server Error"});
        }
}

const adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=generateToken(email+password);
            res.json({success:true,token, message:"Admin logged in successfully"});
        }else{
            res.json({success:false, message:"Invalid Credentials"});
        }
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Internal Server Error"});
    }
}

const getProfile=async(req,res)=>{
    try{
        const user=await userModel.findById(req.body.userId).select("-password");
        res.json({success:true,user});
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Internal Server Error"});
    }
}

export {loginUser,registerUser,adminLogin,getProfile};