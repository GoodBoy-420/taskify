import { TaskModel } from "../models/task.model.js";

const createTask = async (userId, title, description) => {
  const task = await TaskModel.create({ user: userId, title, description });
  return task;
};

const getTasks = async (userId) => {
  return await TaskModel.find({ user: userId }).sort({ createdAt: -1 });
};

export { createTask, getTasks };
