import express from "express";
import * as AuthController from "../controllers/auth.controller.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router.route("/register").post(catchAsync(AuthController.register));
router.route("/login").post(catchAsync(AuthController.login));
router.route("/refresh-token").post(catchAsync(AuthController.refreshToken));

router.route("/email-verify").post(catchAsync(AuthController.emailVerify));
router.route("/otp-verify").post(catchAsync(AuthController.otpVerify));
router.route("/reset-password").post(catchAsync(AuthController.resetPassword));

export default router;
