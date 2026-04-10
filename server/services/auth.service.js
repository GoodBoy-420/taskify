import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../configs/config.js";
import { sendEmail } from "../libs/sendEmail.js";
import { UserModel } from "../models/user.model.js";
import getNewToken from "../utils/getNewToken.js";

const register = async (name, email, password) => {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    const err = new Error("User already exists with this mail.");
    err.statusCode = 404;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  password = hashedPassword;

  const newUser = await UserModel.create({ name, email, password });

  newUser.password = undefined;
  newUser.otp = undefined;
  newUser.role = undefined;
  newUser._id = undefined;

  return newUser;
};

const login = async (email, password) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    const err = new Error("User not found with this mail.");
    err.statusCode = 404;
    throw err;
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    const err = new Error("Incorrect password");
    err.statusCode = 401;
    throw err;
  }

  const token = await getNewToken(user);

  user.password = undefined;
  user.otp = undefined;
  user.password = undefined;
  user._id = undefined;

  return { user, token };
};

const refreshToken = async (refreshToken) => {
  const decoded = await jwt.verify(
    refreshToken,
    config.jwtoken.refresh_secretKey,
  );

  if (!decoded) {
    const err = new Error("Invalid token");
    err.statusCode = 401;
    throw err;
  }

  const user = await UserModel.findById(decoded.id);

  if (!user) {
    const err = new Error("User is not authorized");
    err.statusCode = 401;
    throw err;
  }

  const token = getNewToken(user);

  return token;
};

const emailVerify = async (email) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    const err = new Error("User not found with this mail.");
    err.statusCode = 404;
    throw err;
  }
  const code = String(Math.floor(100000 + Math.random() * 900000));

  await UserModel.updateOne({ email }, { otp: code });

  await sendEmail(email, "OTP Verification", `Your OTP code is ${code}`);

  return { Message: "OTP sent to your mail" };
};

const otpVerify = async (email, code) => {
  const user = await UserModel.findOne({ email, otp: code });

  if (!user) {
    const err = new Error("User not found with this mail.");
    err.statusCode = 404;
    throw err;
  }

  return { message: "OTP verified successfully." };
};

const resetPassword = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    const err = new Error("User not found with this mail.");
    err.statusCode = 404;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await UserModel.updateOne({ email }, { password: hashedPassword, otp: 0 });

  return { message: "Password changed successfully." };
};

export { emailVerify, login, otpVerify, refreshToken, register, resetPassword };
