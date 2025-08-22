import express from "express";
import { registerUser, loginUser , adminLogin ,getProfile,setProfile} from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";
import { set } from "mongoose";

const userRouter= express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/profile",userAuth,getProfile);
userRouter.put("/setProfile",userAuth,setProfile);
userRouter.post("/admin",adminLogin);

export default userRouter;
