import mongoose from "mongoose";

export const connectDb = async () => {
  const MONGO_URI = process.env.MONGO_URI as string;
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
