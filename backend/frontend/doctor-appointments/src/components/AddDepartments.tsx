import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/axios";
import { useState } from "react";
import { addDepartmentSchema } from "../validations/addDepartmentSchema";

type DepartmentType = yup.InferType<typeof addDepartmentSchema>;

function AddDepartments() {
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentType>({
    resolver: yupResolver(addDepartmentSchema),
  });

  const onSubmit: SubmitHandler<DepartmentType> = async (data) => {
    setServerError("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      const fileList = data.image as unknown as FileList;
      formData.append("image", fileList[0]);
      const token = localStorage.getItem("token");

      const res = await api.post("/departments/addDepartment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Department Created:", res.data);

      reset();
    } catch (err: any) {
      console.error(err);
      setServerError(
        err.response?.data?.message || "Error creating department."
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 shadow-lg hover:scale-95 transition-all duration-700 rounded-lg my-4">
      <h2 className="text-xl text-center font-bold mb-5">Add New Department</h2>

      {serverError && (
        <p className="text-red-600 text-center mb-3">{serverError}</p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="grid grid-cols-1 gap-4"
      >
        <div>
          <label className="block mb-1 font-medium">Department Name</label>
          <input
            {...register("name")}
            type="text"
            className="input input-primary w-full"
            placeholder="Department Name"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="textarea textarea-primary w-full"
            placeholder="Description..."
          ></textarea>
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            {...register("image")}
            type="file"
            accept="image/*"
            className="input input-primary w-full"
          />
          {errors.image && (
            <p className="text-red-600 text-sm">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full rounded-full"
        >
          {isSubmitting ? "Loading..." : "Add Department"}
        </button>
      </form>
    </div>
  );
}

export default AddDepartments;
