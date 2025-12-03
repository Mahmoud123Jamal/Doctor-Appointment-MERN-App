import { Schema, model } from "mongoose";
import { IDepartments } from "../types/IdepartmentsType";

const departmentSchema = new Schema<IDepartments>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
});

const Departments = model<IDepartments>("Department", departmentSchema);
export default Departments;
