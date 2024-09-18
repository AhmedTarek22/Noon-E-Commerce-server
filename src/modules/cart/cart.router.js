import express from "express";

import {
  addToCart,
  removeFromCart,
  updateCart,
  getCartCount,
  getCartItems,
} from "./cart.controller.js";
import { verifyToken } from "../middleWare/verifyToken.js";

const cartRoutes = express.Router();


cartRoutes.get("/getcartitems", verifyToken, getCartItems);
cartRoutes.post("/addtocart", verifyToken, addToCart);
cartRoutes.get("/cart-count", verifyToken, getCartCount);
cartRoutes.put("/updatecart", verifyToken, updateCart);
cartRoutes.delete("/removefromcart/:productId", verifyToken, removeFromCart);

export default cartRoutes;
