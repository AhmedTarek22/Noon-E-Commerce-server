import { verifyTokenAndRole } from "../middleWare/verifyTokenAndRole.js";
import { createCoupon, deleteCoupon, getAllCoupons, updateCoupon } from "./coupon.controller.js";
import express from "express";


const couponRoutes = express.Router();

couponRoutes.post("/addCoupon", verifyTokenAndRole, createCoupon);
couponRoutes.delete("/deleteCoupon/:id", verifyTokenAndRole, deleteCoupon);
couponRoutes.put("/updateCoupon/:id", verifyTokenAndRole, updateCoupon);
couponRoutes.get("/getAllCoupons", verifyTokenAndRole, getAllCoupons);


export default couponRoutes;
