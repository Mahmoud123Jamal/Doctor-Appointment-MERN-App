import * as yup from "yup";
export const AppointmentSchema = yup.object().shape({
  doctor: yup.string().required("Doctor is required"),
  date: yup.string().required("Date is required"),
  reason: yup
    .string()
    .required("Reason is required")
    .min(20, "Reason must be at least 20 characters"),
});
