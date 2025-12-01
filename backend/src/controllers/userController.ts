import { hashPassword } from "./../utils/hashPassword";
import { Request, Response } from "express";
import User from "../models/userModel";
import { catchAsync } from "../utils/catchAsync";
const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
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

    const hashPassworded = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashPassworded,
    });
    res.status(201).json({ status: "success", data: { user: newUser } });
  }
});

const login = catchAsync(async (req: Request, res: Response) => {});

const getUserInfo = catchAsync(async (req: Request, res: Response) => {});
