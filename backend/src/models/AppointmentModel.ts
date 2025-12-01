import moongoose, { Schema } from "mongoose";
import { IAppointment } from "../types/IAppointment";

const appointmentSchema = new Schema<IAppointment>({
  user: { type: moongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctor: {
    type: moongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  date: { type: Date, required: true },
  reason: { type: String, required: true },
});

const Appointment = moongoose.model("Appointment", appointmentSchema);
export default Appointment;
