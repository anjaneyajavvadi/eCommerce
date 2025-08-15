import express from "express";
import { registerUser, loginUser , adminLogin ,getProfile} from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const userRouter= express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/profile",userAuth,getProfile);
userRouter.post("/admin",userAuth,adminLogin);

export default userRouter;
