import { Document, Types } from "mongoose";
import { IUser } from "./IUsertype";
import { IDoctor } from "./IDoctortype";
export interface IAppointment extends Document {
  user: Types.ObjectId | IUser;
  doctor: Types.ObjectId | IDoctor;
  date: Date;
  reason: string;
}
