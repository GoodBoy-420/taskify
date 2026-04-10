import mongoose from "mongoose";
import config from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.db.url);
    console.log("DB connected");
  } catch (error) {
    console.log(`DB error- ${error}`);
  }
};
