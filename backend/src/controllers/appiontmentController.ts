import { Request, Response } from "express";
import Appointment from "../models/AppointmentModel";
import { catchAsync } from "../utils/catchAsync";

export const createAppointment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { doctor, date, reason } = req.body;
    if (!doctor || !date || !reason) {
      res.status(400).json({
        status: "fail",
        data: { message: "Please provide all required fields" },
      });
      return;
    }
    const appointment = await Appointment.create({
      user: req.user?.id,
      doctor,
      date,
      reason,
    });
    res.status(201).json({ status: "success", data: { appointment } });
  }
);

export const getUserAppointments = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const appointments = await Appointment.find({
      user: req.user?.id,
    }).populate("doctor");

    res.status(200).json({ status: "success", data: { appointments } });
  }
);

export const deleteUserAppointment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const appointment = await Appointment.findOneAndDelete({
      _id: id,
      user: req.user?.id,
    });
    if (!appointment) {
      res
        .status(404)
        .json({ status: "fail", data: { message: "Appointment not found" } });
      return;
    }
    res.status(200).json({
      status: "success",
      data: { message: "Appointment deleted successfully" },
    });
  }
);
