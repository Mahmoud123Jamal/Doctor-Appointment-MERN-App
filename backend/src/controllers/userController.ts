import { hashPassword, comparePassword } from "./../utils/hashPassword";
import { Request, Response } from "express";
import User from "../models/userModel";
import { catchAsync } from "../utils/catchAsync";
import { generateToken } from "../utils/JWT";
export const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, role = "user" } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ status: "fail", data: { message: "All fields are required" } });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(409)
      .json({ status: "fail", data: { message: "User already exists" } });
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  //Generate JWT
  const token = generateToken(newUser.email, newUser._id, newUser.role);

  return res
    .status(201)
    .json({ status: "success", data: { user: newUser, token } });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password, role = "user" } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "fail", data: { message: "All fields are required" } });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ status: "fail", data: { message: "Invalid credentials" } });
  }
  // Verify password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ status: "fail", data: { message: "Invalid credentials" } });
  }
  const token = generateToken(user.email, user._id, user.role);

  return res.status(200).json({ status: "success", data: { user, token } });
});

export const getUserInfo = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json({ status: "fail", data: { message: "User not found" } });
  }
  return res.status(200).json({ status: "success", data: { user } });
});
