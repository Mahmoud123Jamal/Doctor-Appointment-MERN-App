import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/axios";
import { useState } from "react";
import { addDepartmentSchema } from "../validations/addDepartmentSchema";
import { useToast } from "../hooks/useToast";
import { LoadingDots } from "./Loadings";
import { useAuth } from "../context/AuthContext";

type DepartmentType = yup.InferType<typeof addDepartmentSchema>;

function AddDepartments() {
  const [serverError, setServerError] = useState("");
  const { user } = useAuth();
  const { error, success } = useToast();

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

      await api.post("/departments/addDepartment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      success("Department created successfully.");
      reset();
    } catch (err: any) {
      error("Error creating department", err);
      setServerError(
        err.response?.data?.message || "An unexpected server error occurred."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4">
      {user?.role === "admin" ? (
        <div className="w-full max-w-3xl p-6 bg-white shadow-xl rounded-lg my-12">
          <h2 className="text-2xl text-center font-extrabold text-blue-950 mb-6">
            Add New Department
          </h2>

          {serverError && (
            <p className="bg-red-50 text-red-700 text-center p-3 mb-4 rounded border border-red-200">
              {serverError}
            </p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="grid grid-cols-1 gap-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-1 font-medium text-gray-600"
              >
                Department Name
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className="input input-bordered input-primary w-full"
                placeholder="e.g., Cardiology"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-1 font-medium text-gray-600"
              >
                Description
              </label>
              <textarea
                {...register("description")}
                id="description"
                rows={4}
                className="w-full input input-bordered input-primary  resize-y"
                placeholder="A brief description of the department's focus..."
              ></textarea>
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="image"
                className="block mb-1 font-medium text-gray-700"
              >
                Image
              </label>
              <input
                {...register("image")}
                type="file"
                id="image"
                accept="image/*"
                className="w-full border-blue-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border  rounded-lg p-1 cursor-pointer"
              />
              {errors.image && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary mt-2 py-3 px-4 rounded-full 
                          disabled:bg-gray-400 flex items-center justify-center"
            >
              {isSubmitting ? <LoadingDots /> : "Add Department"}
            </button>
          </form>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center w-full">
          <p className="text-xl text-red-600 text-center p-8 bg-red-50 rounded-lg shadow-lg border border-red-200">
            You are not authorized to add a department. This action is for
            administrators only.
          </p>
        </div>
      )}
    </div>
  );
}

export default AddDepartments;
