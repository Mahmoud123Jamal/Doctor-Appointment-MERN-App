import { Request, Response, NextFunction } from "express";

export const multerErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
  next();
};
