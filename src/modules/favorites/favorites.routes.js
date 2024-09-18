import express from "express";
import {
  toggleFavorite,
  getUserFavorites,
  removeFromFavorite,
  getWishListCount,
} from "./favorites.controller.js";
import { verifyToken } from "../middleWare/verifyToken.js";

const favoriteRoutes = express.Router();

favoriteRoutes.get("/getUserFavorites", verifyToken, getUserFavorites);
favoriteRoutes.get("/getwishlistcount", verifyToken, getWishListCount);
favoriteRoutes.post("/togglefavorite", verifyToken, toggleFavorite);
favoriteRoutes.delete(
  "/removefromfavorite/:productId",
  verifyToken,
  removeFromFavorite
);

export default favoriteRoutes;
