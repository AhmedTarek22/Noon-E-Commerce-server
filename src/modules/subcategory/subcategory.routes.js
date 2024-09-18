import express from "express";
import {
  addSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
} from "./subcategory.controller.js";
import { verifyTokenAndRole } from "../middleWare/verifyTokenAndRole.js";

const subCategoryRouters = express.Router();

subCategoryRouters.get("/getallsubcategories", getAllSubCategories);
subCategoryRouters.post("/addSubCategory", verifyTokenAndRole, addSubCategory);
subCategoryRouters.put("/updateSubCategory/:id", verifyTokenAndRole, updateSubCategory);
subCategoryRouters.delete("/deleteSubCategory/:id", verifyTokenAndRole, deleteSubCategory);
subCategoryRouters.get("/getSubCategory/:id", getSubCategory);

export default subCategoryRouters;
