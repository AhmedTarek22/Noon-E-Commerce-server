import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "./category.controller.js";

const categoryRouters = express.Router();

categoryRouters.post("/addcategory", addCategory);
categoryRouters.get("/getallcategories", getAllCategories);
categoryRouters.get("/getcategory/:id", getCategory);
categoryRouters.delete("/deletecategory/:id", deleteCategory);
categoryRouters.put("/updatecategory/:id", updateCategory);

export default categoryRouters;
