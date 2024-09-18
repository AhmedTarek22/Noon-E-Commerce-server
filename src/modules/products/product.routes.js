import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getSomeProducts,
  updateProduct,
} from "./product.controller.js";
import { verifyTokenAndRole } from "../middleWare/verifyTokenAndRole.js";

const productRoutes = express.Router();
productRoutes.post("/getsomeproducts", getSomeProducts);

productRoutes.get("/getproduct/:id", getProduct);
productRoutes.get("/getallproduct", getAllProducts);
productRoutes.put("/updateproduct/:id", verifyTokenAndRole, updateProduct);
productRoutes.delete("/deleteproduct/:id", verifyTokenAndRole, deleteProduct);
productRoutes.post("/addproduct", verifyTokenAndRole, createProduct);

export default productRoutes;
