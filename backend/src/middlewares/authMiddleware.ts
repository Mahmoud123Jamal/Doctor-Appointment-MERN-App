import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/JWT";
import { catchAsync } from "../utils/catchAsync";

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ status: "fail", message: "Invalid token" });
    }
  }
);
