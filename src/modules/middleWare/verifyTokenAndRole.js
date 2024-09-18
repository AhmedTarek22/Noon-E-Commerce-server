import jwt from "jsonwebtoken";
import AppError from "../../utility/appError.js";

export const verifyTokenAndRole = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return next(new AppError("Token is required", 400));
  }

  jwt.verify(token, "allahAkber", (err, decoded) => {
    if (err) {
      return next(new AppError("Invalid token", 400));
    }
    req.user = decoded;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: You must be an admin to add a product" });
    }

    next();
  });
};