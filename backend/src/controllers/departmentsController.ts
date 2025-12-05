import { Request, Response } from "express";
import Departments from "../models/departmentsModel";
import { catchAsync } from "../utils/catchAsync";

export const createDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { name, description } = req.body;

    // if (!req.file) {
    //   console.log(req.file);
    //   return res.status(400).json({
    //     status: "fail",
    //     data: { message: "Please upload an image" },
    //   });
    // }

    // const image = req?.file?.filename;

    if (!name || !description) {
      return res.status(400).json({
        status: "fail",
        data: { message: "Please provide all required fields" },
      });
    }

    const department = await Departments.create({
      name,
      description,
      //   image,
    });

    return res.status(201).json({ status: "success", data: { department } });
  }
);

export const countDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const departmentsCount: number = await Departments.countDocuments();

    if (departmentsCount === undefined || departmentsCount === null) {
      return res.status(500).json({
        status: "error",
        message: "Error fetching departments count",
      });
    }

    res.status(200).json({
      status: "success",
      data: { count: departmentsCount },
    });
  }
);
