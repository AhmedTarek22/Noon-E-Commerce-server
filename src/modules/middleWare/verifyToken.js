import jwt from "jsonwebtoken";
import AppError from "../../utility/appError.js";

export const verifyToken = (req, res, next) => {
  jwt.verify(req.headers.token, "allahAkber", async (err, decoded) => {
    if (err) {
      return next(new AppError("invalid token", 400));
    }
    req.user = decoded;
    next();
  });
};
