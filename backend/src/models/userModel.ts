import { Schema, model } from "mongoose";
import { IUser } from "../types/IUsertype";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = model<IUser>("User", userSchema);
export default User;
