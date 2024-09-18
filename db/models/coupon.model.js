import mongoose, { model, Schema } from "mongoose";

const couponSchema = new Schema({
  discount: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
});

const couponModel = model("Coupon", couponSchema);

export default couponModel;
