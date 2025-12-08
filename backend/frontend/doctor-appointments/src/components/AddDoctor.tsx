import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { AddDoctorType } from "../types/DoctorType";
import { addDoctorSchema } from "../validations/addDoctorSchema";
import api from "../api/axios";
import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";

function AddDoctor() {
  const [serverError, setServerError] = useState("");
  const [previewImage, setPreviewImage] = useState<string>("/avatar.jpg");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddDoctorType, any, AddDoctorType>({
    resolver: yupResolver<AddDoctorType, any, any>(addDoctorSchema),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    setValue("image", event.target.files as FileList, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<AddDoctorType> = async (data) => {
    setServerError("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("specialization", data.specialization);
      formData.append("experience", data.experience.toString());
      formData.append("description", data.description);
      formData.append("image", data?.image![0]);

      const token = localStorage.getItem("token");

      const res = await api.post("/doctors/addDoctors", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Doctor Created:", res.data);

      reset();
      setPreviewImage("/avatar.jpg");
    } catch (err: any) {
      console.error(err);
      setServerError(err.response?.data?.message || "Error creating doctor.");
    }
  };

  return (
    <>
      {user ? (
        <div className="max-w-3xl mx-auto p-4 shadow-lg hover:scale-95 transition-all duration-700 rounded-lg shadow-blue-200 my-4 cursor-pointer">
          <h2 className="text-xl text-center font-bold mb-5">Add New Doctor</h2>

          {serverError && <p className="text-red-600">{serverError}</p>}

          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* LEFT — Image Preview */}
            <div className="flex flex-col items-center space-y-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-xl border border-b-blue-950 shadow"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-outline btn-primary w-[90%]"
              >
                Choose Image
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image")}
                ref={fileInputRef}
                onChange={handleImageChange}
              />

              {errors.image && (
                <p className="text-red-600 text-sm">{errors.image.message}</p>
              )}
            </div>

            {/* RIGHT — Form Fields */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block mb-1 font-medium">Doctor Name</label>
                <input
                  {...register("name")}
                  className="input input-primary w-full"
                  placeholder="Doctor name"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Specialization</label>
                <input
                  {...register("specialization")}
                  className="input input-primary w-full"
                  placeholder="Specialization"
                />
                {errors.specialization && (
                  <p className="text-red-600 text-sm">
                    {errors.specialization.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Experience (years)
                </label>
                <input
                  type="number"
                  {...register("experience")}
                  className="input input-primary w-full"
                  min={1}
                  placeholder="Experience (years)"
                />
                {errors.experience && (
                  <p className="text-red-600 text-sm">
                    {errors.experience.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  {...register("description")}
                  className="textarea textarea-primary w-full"
                  placeholder="Description...."
                ></textarea>
                {errors.description && (
                  <p className="text-red-600 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full rounded-full"
              >
                {isSubmitting ? "Loading..." : "Add Doctor"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="h-screen text-center place-content-center ">
          <p className="text-red-600 font-extrabold">
            Sorry, you must login as Admin User.
          </p>
        </div>
      )}
    </>
  );
}

export default AddDoctor;
