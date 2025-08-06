import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

const addProduct=async(req,res)=>{
    try{
        const {name,description,price,category,subCategory,sizes,bestSeller}=req.body;
        const img1=req.files.image1 && req.files.image1[0];
        const img2=req.files.image2 && req.files.image2[0];
        const img3=req.files.image3 && req.files.image3[0];
        const img4=req.files.image4 && req.files.image4[0];

        const images=[img1,img2,img3,img4].filter((item)=>item!==undefined);
        
        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                const result=await cloudinary.uploader.upload(item.path);
                return result.secure_url;
            })
        )
        
        const productData={
            name,
            description,
            category,
            subCategory,
            price:Number(price),
            sizes: sizes ? JSON.parse(sizes) : [],
            bestSeller:bestSeller==='true'?true:false,
            image:imagesUrl,
            date:Date.now()
        }
        
        const product=new productModel(productData);
        await product.save();


        res.json({success:true, message:"Product added successfully"});
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Internal Server Error"});
    }
}

const listProducts=async(req,res)=>{
    try{
        const products=await productModel.find({});
        res.json({success:true,products});
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Internal Server Error"});
    }   
}

const removeProduct=async(req,res)=>{
    try{
        const id=req.params.id;
        await productModel.findByIdAndDelete(id);
        res.json({success:true, message:"Product removed successfully"});
    }
    catch(err){
        console.log(err);
        res.json({success:false, message:"Internal Server Error"});
    }
}

const singleProduct=async(req,res)=>{
    const productId=req.params.id;
    try{
        const product=await productModel.findById(productId);
        res.json({success:true,product});
    }catch(e)
    {
        console.log(e);
        res.json({success:false, message:"Internal Server Error"});
    }
}
export {addProduct,listProducts,removeProduct,singleProduct};
