import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import Doctor from "../models/DoctorModel";

export const addDoctors = catchAsync(async (req: Request, res: Response) => {
  const { name, specialization, description, experience } = req.body;
  if (!name || !specialization || !description || !experience) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const imageUrl = `http://localhost:5000/uploads/${req.file?.filename}`;
  const newDoctor = new Doctor({
    name,
    specialization,
    image: imageUrl,
    description,
    experience,
  });

  const savedDoctor = await newDoctor.save();
  res.status(201).json({
    status: "success",
    data: { doctor: savedDoctor },
  });
});

export const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const doctors = await Doctor.find();
  res.status(200).json({ status: "success", data: { doctors } });
});

export const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const doctor = await Doctor.findById(id);
  if (!doctor) {
    return res
      .status(404)
      .json({ status: "fail", data: { message: "Doctor not found." } });
  }
  res.status(200).json({ status: "success", data: { doctor } });
});

export const countDoctors = catchAsync(async (req: Request, res: Response) => {
  const doctorCount = await Doctor.countDocuments();
  res.status(200).json({ status: "success", data: { count: doctorCount } });
});
