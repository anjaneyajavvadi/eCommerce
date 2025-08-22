import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
        quantity: { type: Number, required: true },
        size: { type: String },
        price: { type: Number, required: true }, // snapshot price at time of purchase
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled","Order Placed"],
      default: "Pending",
    },
    address: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "stripe", "razorpay"],
      default: "cod",
    },
    payment: {
      type: Boolean,
      default: false,
    },


    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
