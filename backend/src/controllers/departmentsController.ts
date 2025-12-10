import { Request, Response } from "express";
import Departments from "../models/departmentsModel";
import { catchAsync } from "../utils/catchAsync";

export const createDepartment = catchAsync(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide all required fields",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      status: "fail",
      message: "Please upload an image",
    });
  }
  const imageUrl = `/uploads/${req.file.filename}`;

  const department = await Departments.create({
    name,
    description,
    image: imageUrl,
  });

  res.status(201).json({
    status: "success",
    data: { department },
  });
});

export const getAllDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const departments = await Departments.find();
    res.status(200).json({ status: "success", data: { departments } });
  }
);

export const getDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const department = await Departments.findById(id);
    if (!department) {
      return res
        .status(404)
        .json({ status: "fail", data: { message: "Department not found." } });
    }
    res.status(200).json({ status: "success", data: { department } });
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
