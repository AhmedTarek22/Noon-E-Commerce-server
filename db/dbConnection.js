import mongoose from "mongoose";
import { config as configDotenv } from "dotenv";
import fs from "fs/promises";
import categoryModel from "./models/category.model.js";
import subCategoryModel from "./models/subCategory.model.js";
import productModel from "./models/product.model.js";
import { data } from "./data.js";

configDotenv();

const url = process.env.MONGO_URL;

export const dbConnection = mongoose
  .connect(url)
  .then(async () => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.error("MongoDB connection error:", err));
