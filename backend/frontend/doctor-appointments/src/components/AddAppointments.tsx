import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import type { DoctorForAppiontments } from "../types/DoctorType";
import type { AppointmentFormInputs } from "../types/AppointmentType";
import { AppointmentSchema } from "../validations/appointmentSchema";
import { useToast } from "../hooks/useToast";
import { LoadingBall } from "./Loadings";

function AddAppointments() {
  const [doctors, setDoctors] = useState<DoctorForAppiontments[]>([]);
  const [serverError, setServerError] = useState("");
  const { user } = useAuth();
  const { error, success } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AppointmentFormInputs>({
    resolver: yupResolver(AppointmentSchema),
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors/allDoctors");

        setDoctors(res.data.data.doctors);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  const onSubmit: SubmitHandler<AppointmentFormInputs> = async (data) => {
    setServerError("");
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/appointments/createAppointment",
        {
          doctor: data.doctor,
          date: data.date,
          reason: data.reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      success("Appointment created successfully.");

      reset();
    } catch (err: any) {
      error("Error creating appointment.", err);
      setServerError(
        err.response?.data?.data?.message || "Error creating appointment"
      );
    }
  };

  return (
    <div>
      {user ? (
        <div className="max-w-md mx-auto p-4">
          <h2 className="text-xl text-blue-950 font-bold mb-4">
            Add Appointment
          </h2>

          {serverError && <p className="text-red-600 mb-3">{serverError}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1 font-medium">
                Doctor
              </label>
              <select
                {...register("doctor")}
                className="input input-bordered cursor-pointer placeholder:text-gray-600 input-primary w-full"
              >
                <option value="" disabled className="text-gray-600">
                  Select a doctor
                </option>
                {Array.isArray(doctors) &&
                  doctors.map((doc) => (
                    <option
                      key={doc._id}
                      value={doc._id}
                      className="text-gray-600"
                    >
                      {doc.name}{" "}
                      {doc.specialization ? `- ${doc.specialization}` : ""}
                    </option>
                  ))}
              </select>
              {errors.doctor && (
                <p className="text-red-600 text-sm">{errors.doctor.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1 font-medium">
                Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                {...register("date")}
                className="input input-bordered input-primary w-full "
              />
              {errors.date && (
                <p className="text-red-600 text-sm">{errors.date.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">
                Reason
              </label>
              <textarea
                {...register("reason")}
                className="input input-bordered input-primary w-full"
                placeholder="Reason for appointment"
              />
              {errors.reason && (
                <p className="text-red-600 text-sm">{errors.reason.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full rounded-full"
            >
              {isSubmitting ? <LoadingBall /> : "Add Appointment"}
            </button>
          </form>
        </div>
      ) : (
        <div className="text-red-600 text-center font-bold h-screen place-content-center">
          you should login to add appointments
        </div>
      )}
    </div>
  );
}

export default AddAppointments;
