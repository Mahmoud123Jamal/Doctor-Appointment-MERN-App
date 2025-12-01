import { Schema, model } from "mongoose";
import { IDoctor } from "../types/IDoctortype";

const doctorSchema = new Schema<IDoctor>({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  experience: { type: Number, required: true },
});

const Doctor = model<IDoctor>("Doctor", doctorSchema);
export default Doctor;
