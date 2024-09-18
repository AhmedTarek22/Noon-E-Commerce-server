import { verifyToken } from "../middleWare/verifyToken.js";
import { handleStripe } from "./paymentcontroller.js";
import express from "express";

const paymentRoute = express.Router();

paymentRoute.post("/checkout", verifyToken, handleStripe);

export default paymentRoute;
