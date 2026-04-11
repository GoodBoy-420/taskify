import mongoose from "mongoose";

export const setupDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

export const teardownDB = async () => {
  await mongoose.connection.close();
};

export const cleanupUser = async (email) => {
  await mongoose.connection.collection("users").deleteOne({ email });
};
export const cleanupTask = async () => {
  await mongoose.connection
    .collection("tasks")
    .deleteOne({ title: "Learn Testing" });
};
