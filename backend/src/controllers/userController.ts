import { Request, Response } from "express";
import User from "../models/userModel";
import { catchAsync } from "../utils/catchAsync";
const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
});

const login = catchAsync(async (req: Request, res: Response) => {});

const getUserInfo = catchAsync(async (req: Request, res: Response) => {});
