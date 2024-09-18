import { userModel } from "../../../db/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../../email/email.js";
import catchErrors from "../middleWare/handleErrors.js";
import AppError from "../../utility/appError.js";
import sendResetEmail from "../../email/ResetPassword/emailResetPassword.js";

const signUp = catchErrors(async (req, res, next) => {
  const addUser = await userModel.insertMany(req.body);
  addUser[0].password = undefined;
  sendEmail(req.body.email, req.body.fullName);
  res.json({ message: "added successfully", addUser });
});

const verifyAccount = catchErrors(async (req, res, next) => {
  let token = req.params.token;
  jwt.verify(token, "allahAkber", async (err, decoded) => {
    if (err) {
      return next(
        new AppError("there is an error occuered please try again", 400)
      );
    }

    const user = await userModel.findOneAndUpdate(
      { email: decoded.email },
      { isConfirmed: true }
    );
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    return res.json({
      message: "ur account has been confirmed, welcome to our website",
    });
  });
});

const signIn = catchErrors(async (req, res, next) => {
  const findUser = await userModel.findOne({ email: req.body.email });

  if (!findUser)
    return next(new AppError("There Is No User With That Email Address", 400));

  if (!bcrypt.compareSync(req.body.password, findUser.password))
    return next(new AppError("sorry, your data is not correct", 409));

  if (!findUser.isConfirmed)
    return next(new AppError("Please Confirm Your Email First", 409));

  let token = jwt.sign(
    {
      id: findUser._id,
      role: findUser.role,
    },
    "allahAkber"
  );
  console.log("password", req.body.password);
  console.log("password", req.body.email);
  res.json({ message: "Welcome", token });
});

const updateUser = catchErrors(async (req, res, next) => {
  let id = req.user.id;
  await userModel.findByIdAndUpdate(id, { ...req.body });
  res.json({ message: "user data has been updated successfully" });
});

const deleteUser = catchErrors(async (req, res, next) => {
  let id = req.user.id;
  let targetUser = await userModel.findById(id);
  console.log(targetUser);
  if (!targetUser) return next(new AppError("this user is not exist", 422));
  await userModel.findByIdAndDelete(id);
  res.json({ message: "the user has been deleted successfully" });
});

const resetPassword = catchErrors(async (req, res, next) => {
  const targetUser = await userModel.findOne({ email: req.body.email });
  if (!targetUser) {
    return next(new AppError("this email doesn't exist", 422));
  } else {
    sendResetEmail(req.body.email);
    return res.json({ message: "reset email was sent successfully" });
  }
});

const pressResetPassword = catchErrors(async (req, res, next) => {
  jwt.verify(req.params.token, "allahAkber", async (err, decoded) => {
    if (err) {
      return new AppError("an error occured please try again", 400);
    } else {
      req.body.password = bcrypt.hashSync(req.body.password, 8);
      await userModel.findOneAndUpdate(
        { email: decoded.email },
        { password: req.body.password }
      );
      res.json({
        message: "your password updated, you can login with your new password",
      });
    }
  });
});

const getusername = catchErrors(async (req, res, next) => {
  const userId = req.user.id;
  const userName = await userModel.findById(userId).select("fullName -_id");

  if (!userName) {
    return new AppError("guest", 400);
  } else {
    res.json(userName);
  }
});

export {
  signUp,
  signIn,
  verifyAccount,
  deleteUser,
  updateUser,
  resetPassword,
  pressResetPassword,
  getusername,
};
