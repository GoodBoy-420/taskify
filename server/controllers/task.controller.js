import * as TaskService from "../services/task.service.js";
import { getAuthUser } from "../utils/getAuthUser.js";

const createTask = async (req, res) => {
  const user = await getAuthUser(req);
  const userId = user[0]?._id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  const result = await TaskService.createTask(userId, title, description);

  res.status(201).json({
    success: true,
    data: result,
  });
};

const getTasks = async (req, res) => {
  const user = await getAuthUser(req);
  const userId = user[0]?._id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const result = await TaskService.getTasks(userId);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export { createTask, getTasks };
