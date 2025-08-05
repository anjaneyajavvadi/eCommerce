import mongoose, { mongo } from "mongoose";

const connectDb=async()=>{
    try{
        mongoose.connection.on("connected",()=>{console.log("✅ MongoDB Connection Success")});
        await mongoose.connect(`${process.env.MONGODB_URI}/eCom`);
    } catch(err){

    }
}
export default connectDb;