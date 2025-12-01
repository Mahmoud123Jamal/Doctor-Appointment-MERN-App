import { Document } from "mongoose";
export interface IDoctor extends Document {
  name: string;
  specialization: string;
  image: string;
  description: string;
  experience: number;
}
