import express from "express";
import { saveUserAddress,getUserAddressess } from "../controllers/addressController.js";
import userAuth from "../middleware/userAuth.js";

const addressRouter= express.Router();

addressRouter.post("/saveAddress",userAuth,saveUserAddress);
addressRouter.get("/getUserAddressess",userAuth,getUserAddressess);

export default addressRouter;