import jwt from 'jsonwebtoken';

const adminAuth=async(req,res,next)=>{
    try{
        const {token}=req.headers;
        if(!token){
            return res.json({success:false, message:"Token not found ll"});
        }
        const token_decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(token_decoded);
        console.log(process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD);
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