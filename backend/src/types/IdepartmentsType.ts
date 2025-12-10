import { Document } from "mongoose";

export interface IDepartments extends Document {
  name: string;
  description: string;
  image: string;
}
