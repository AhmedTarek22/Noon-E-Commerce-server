import { userModel } from "../../../db/models/user.model.js";
import bcrypt from "bcrypt";
import AppError from "../../utility/appError.js";

export const checkEmail = async (req, res, next) => {
  let foundedUser = await userModel.findOne({ email: req.body.email });
  if (foundedUser)
    return next(new AppError("Already Register please sign in instead", 409));

  req.body.password = bcrypt.hashSync(req.body.password, 8);
  next();
};
