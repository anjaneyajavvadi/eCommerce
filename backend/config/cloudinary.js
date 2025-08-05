import {v2 as cloudinary} from 'cloudinary';

const connectCloudinary=async()=>{
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
    })
     try {
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary connection success');
  } catch (error) {
    console.error('❌ Failed to connect to Cloudinary:', error);
  }
}
export default connectCloudinary;