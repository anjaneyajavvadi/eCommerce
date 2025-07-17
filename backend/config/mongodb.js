import mongoose, { mongo } from "mongoose";

const connectDb=async()=>{
    try{
        mongoose.connection.on("connected",()=>{console.log("Connected to MongoDB")});
        await mongoose.connect(`${process.env.MONGODB_URI}/eCom`);
    } catch(err){

    }
}
export default connectDb;