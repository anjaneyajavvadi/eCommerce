import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { itemId, size } = req.body;
        
        const user = await userModel.findById(userId); // Replace with your User model
        
        let cartData = user.cartData || {};
        
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        
        await userModel.findByIdAndUpdate(userId, { cartData });
        
        res.status(200).json({ 
            success: true, 
            message: "Product added to cart successfully" 
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ 
            success: false, 
            message: "Failed to add product to cart" 
        });
    }
};

const getUserCart = async (req, res) => {
    try{
        const {userId}=req.body;
        const userData=await userModel.findById(userId);
        res.json({success:true,cart:userData.cartData});
    }
    catch(err){
        console.log(err)
        res.json({success:false, message:"Internal Server Error"});
    }
};

const updateCart = async (req, res) => {
    try{
        const {userId,itemId,size,quantity}=req.body;

        const userData=await userModel.findById(userId);
        let cartData=structuredClone(userData.cartData);

        cartData[itemId][size]=quantity;
        
        await userModel.findByIdAndUpdate(userId,{cartData:cartData});
        
        res.json({success:true,message:"Cart Updated"});
        
    }
    catch(err){
        console.log(err)
        res.json({success:false, message:"Internal Server Error"});
    }
};

const removeFromCart = async (req, res) => {
    try{
        const {userId,itemId,size}=req.body;
        const userData=await userModel.findById(userId);
        let cartData=structuredClone(userData.cartData);
        delete cartData[itemId][size];
        await userModel.findByIdAndUpdate(userId,{cartData:cartData});
        res.json({success:true,message:"Item removed from cart"});
    }
    catch(err){
        console.log(err)
        res.json({success:false, message:"Internal Server Error"});
    }
};

export { addToCart, getUserCart, updateCart, removeFromCart };