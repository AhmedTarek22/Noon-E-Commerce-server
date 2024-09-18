import mongoose, { model, Schema } from "mongoose";
const productSchema = new Schema({
  name: { type: String, required: true },
  code: { type: Number, required: true, unique: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  rate: { type: Number, required: true },
  onSale: { type: Boolean, required: true },
  priceBeforeSale: { type: String },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
});
const productModel = new model("Product", productSchema);
export default productModel;
