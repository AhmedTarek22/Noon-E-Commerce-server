import mongoose from "mongoose";
import { config as configDotenv } from "dotenv";

configDotenv();

const url = process.env.MONGO_URL;

export const dbConnection = mongoose
  .connect(url)
  .then(async () => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.error("MongoDB connection error:", err));
