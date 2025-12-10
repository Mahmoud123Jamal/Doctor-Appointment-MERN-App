import * as yup from "yup";

export const addDepartmentSchema = yup.object({
  name: yup.string().required("Department name is required"),
  description: yup.string().required("Description is required"),
  image: yup
    .mixed()
    .required("Image is required")
    .test(
      "fileRequired",
      "Image is required",
      (value: any) => value && value.length > 0
    ),
});
