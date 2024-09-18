import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullName: String,
    email: String,

    password: String,
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userModel = model("User", userSchema);
