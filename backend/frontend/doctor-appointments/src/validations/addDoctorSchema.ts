import * as yup from "yup";

export const addDoctorSchema = yup.object().shape({
  name: yup.string().required("Doctor name is required"),
  specialization: yup.string().required("Specialization is required"),
  experience: yup
    .number()
    .typeError("Experience must be a number")
    .min(1, "Minimum experience is 1 year")
    .required("Experience is required"),
  description: yup
    .string()
    .min(20, "Description must be at least 20 characters")
    .required("Description is required"),
  image: yup
    .mixed<FileList>()
    .nullable()
    .required("Image is required")
    .test(
      "fileSelected",
      "Image is required",
      (value) => value && value.length > 0
    ),
});
