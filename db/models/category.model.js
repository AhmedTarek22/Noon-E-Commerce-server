import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const categoryModel = new model("Category", categorySchema);

export default categoryModel;

