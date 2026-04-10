import mongoose, { Schema } from "mongoose";

const dataSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      default: 0,
    },
    profile: {
      profilePic: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UserModel = mongoose.model("users", dataSchema);
