import express from "express";
import authRouter from "./auth.router.js";
import taskRouter from "./task.route.js";

const customRoutes = express.Router();

customRoutes.use("/auth", authRouter);
customRoutes.use("/task", taskRouter);

export default customRoutes;
