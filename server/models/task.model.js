import mongoose, { Schema } from "mongoose";

const dataSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TaskModel = mongoose.model("tasks", dataSchema);
