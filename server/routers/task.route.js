import express from "express";
import * as TaskController from "../controllers/task.controller.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router.post("/create", catchAsync(TaskController.createTask));
router.get("/get-tasks", catchAsync(TaskController.getTasks));

export default router;
