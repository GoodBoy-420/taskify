import dns from "dns";
import mongoose from "mongoose";
import config from "./config.js";

dns.setServers([config.dns.port]);

export const connectDB = async () => {
  try {
    await mongoose.connect(config.db.url);
    console.log("DB connected");
  } catch (error) {
    console.log(`DB error- ${error}`);
  }
};
