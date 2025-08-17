import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    orderData:{type:Object,required:true},
    paymentMethod:{type:String,required:true},
    payment:{type:Boolean,required:true,default:false},
    status:{type:String,required:true,default:"Order Placed"},
    date:{type:Number,required:true}
});

const orderModel=mongoose.models.order || mongoose.model("order",orderSchema);
export default orderModel;