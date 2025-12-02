import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import Doctor from "../models/DoctorModel";

export const addDoctors = catchAsync(async (req: Request, res: Response) => {
  const { name, specialization, image, description, experience } = req.body;
  if (!name || !specialization || !image || !description || !experience) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const newDoctor = new Doctor({
    name,
    specialization,
    image,
    description,
    experience,
  });

  const savedDoctor = await newDoctor.save();
  res.status(201).json({
    status: "success",
    data: { doctor: savedDoctor },
  });
});
