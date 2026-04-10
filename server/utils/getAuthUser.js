import { UserModel } from "../models/user.model.js";

// Only If need more information than stored in token then use this function.

export const getAuthUser = async (req) => {
  const data = await UserModel.aggregate([
    {
      $match: { email: req?.claims?.email },
    },
    {
      $project: { _id: 1, name: 1, email: 1, role: 1 },
    },
  ]);

  if (!data || data.length == 0) {
    const err = new Error("User does not exists");
    err.statusCode = 404;
    throw err;
  }

  return data;
};
