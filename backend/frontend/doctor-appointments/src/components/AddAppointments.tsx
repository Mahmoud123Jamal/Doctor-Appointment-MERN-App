import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import type { Doctor } from "../types/DoctorType";
import type { AppointmentFormInputs } from "../types/AppointmentType";

const schema = yup.object().shape({
  doctor: yup.string().required("Doctor is required"),
  date: yup.string().required("Date is required"),
  reason: yup
    .string()
    .required("Reason is required")
    .min(5, "Reason must be at least 5 characters"),
});

function AddAppointments() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [serverError, setServerError] = useState("");
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AppointmentFormInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors/allDoctors");
        console.log(res.data.data);

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
      const res = await api.post(
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
      console.log("Appointment created:", res.data);
      reset();
    } catch (err: any) {
      console.error(err);
      setServerError(
        err.response?.data?.data?.message || "Error creating appointment"
      );
    }
  };

  return (
    <div>
      {user ? (
        <div className="max-w-md mx-auto p-4">
          <h2 className="text-xl font-bold mb-4">Add Appointment</h2>

          {serverError && <p className="text-red-600 mb-3">{serverError}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Doctor</label>
              <select
                {...register("doctor")}
                className="input input-bordered w-full"
              >
                <option value="">Select a doctor</option>
                {Array.isArray(doctors) &&
                  doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
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
              <label className="block mb-1 font-medium">Date</label>
              <input
                type="date"
                {...register("date")}
                className="input input-bordered w-full"
              />
              {errors.date && (
                <p className="text-red-600 text-sm">{errors.date.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Reason</label>
              <textarea
                {...register("reason")}
                className="input input-bordered w-full"
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
              {isSubmitting ? "Loading..." : "Add Appointment"}
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
