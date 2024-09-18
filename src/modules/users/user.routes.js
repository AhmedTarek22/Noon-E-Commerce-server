import express from "express";
import {
  signUp,
  signIn,
  verifyAccount,
  deleteUser,
  updateUser,
  resetPassword,
  pressResetPassword,
  getusername,
} from "./user.controller.js";
import { verifyToken } from "../middleWare/verifyToken.js";
import { validation } from "../middleWare/validation.js";
import { checkEmail } from "../middleWare/checkEmail.js";

import {
  updateUserValidationSchema,
  userLogInSchema,
  userValidationSchema,
} from "./user.validation.js";

const userRoutes = express.Router();

userRoutes.post(
  "/signup",
  validation(userValidationSchema),
  checkEmail,
  signUp
);
userRoutes.post("/signin", signIn, validation(userLogInSchema));
userRoutes.patch(
  "/updateuser",
  verifyToken,
  validation(updateUserValidationSchema),
  updateUser
);
userRoutes.get("/verify/:token", verifyAccount);
userRoutes.get("/getusername", verifyToken, getusername);
userRoutes.delete("/deleteuser", verifyToken, deleteUser);
userRoutes.patch(
  "/resetpassword",
  validation(updateUserValidationSchema),
  resetPassword
);
userRoutes.post("/pressreset-password/:token", pressResetPassword);

export default userRoutes;
