
import mongoose, { model, Schema } from "mongoose";

const subCategorySchema = new Schema({
  name: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",

    required: true,
  },
});

const SubCategoryModel = new model("SubCategory", subCategorySchema);
export default SubCategoryModel;

