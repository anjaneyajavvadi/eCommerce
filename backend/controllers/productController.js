import {v2 as cloudinary} from 'cloudinary';

const addProduct=async(req,res)=>{
    try{
        const {name,description,price,category,subCategory,sizes,bestSeller}=req.body;

        const img1=req.files.image1[0];
        const img2=req.files.image2[0];
        const img3=req.files.image3[0];
        const img4=req.files.image4[0];
        
        let imageUrl=await Promise.all(
            ImageTrackList.map(async(item)=>{
                const result=await cloudinary.uploader.upload(item.path);
                return result.secure_url;
            })
        )

        res.json({});
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Internal Server Error"});
    }
}