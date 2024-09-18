import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  products: [
    {
      productId: String,
      quantity: Number,
      price: Number,
    },
  ],
  amount: Number,
  currency: {
    type: String,
    default: "EGP",
  },
  status: {
    type: String,
    enum: ["pending", "succeeded", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
