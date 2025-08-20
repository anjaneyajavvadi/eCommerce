import jwt from 'jsonwebtoken';

const adminAuth=async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Token not found" });
        }

        const token = authHeader.split(" ")[1];
        if(!token){
            return res.json({success:false, message:"Token not found"});
        }
        const token_decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(token_decoded.id!==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false, message:"You are not an admin"});
        }
        next();
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Internal Server Error"});
    }
}

export default adminAuth;