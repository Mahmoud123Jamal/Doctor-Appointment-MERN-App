import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import type { Appointment } from "../types/AppointmentType";
import { LoadingDots } from "../components/Loadings";
import { useToast } from "../hooks/useToast";
function MyAppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { success, error } = useToast();
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setServerError(null);
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await api.get("/appointments/getUserAppointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allAppointments = res.data.data?.appointments || [];
        setAppointments(allAppointments);
      } catch (err: any) {
        error("Error fetching appointments.", err);
        setServerError("Something went wrong while fetching appointments.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/appointments/deleteUserAppointment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
      success("Appointment deleted successfully.");
    } catch {
      error("Failed to delete appointment.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingDots />
      </div>
    );
  if (serverError)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        {serverError}
      </p>
    );
  if (appointments.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600 font-medium">
        No appointments found.
      </p>
    );

  return (
    user?.role === "user" && (
      <div className="max-w-3xl mx-auto mt-8 px-4">
        <h2 className="text-2xl text-blue-950 font-bold mb-6 text-center">
          My Appointments
        </h2>
        <div className="space-y-4">
          {appointments.map((appt) => {
            if (!appt.doctor) return null;
            const imageUrl =
              typeof appt.doctor.image === "string"
                ? appt.doctor.image
                : "/avatar.jpg";

            return (
              <div
                key={appt._id}
                className="flex items-center justify-between bg-white shadow p-4 rounded-lg border transition-all duration-700 hover:scale-105 cursor-pointer hover:bg-blue-200"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={imageUrl}
                    alt={appt.doctor.name}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div>
                    <p className=" text-lg">
                      <span className="text-blue-950 font-semibold">
                        Doctor :
                      </span>{" "}
                      <span className="text-gray-600">{appt.doctor.name}</span>
                    </p>
                    <p className="text-lg">
                      <span className=" text-blue-950 font-semibold">
                        Reason:
                      </span>
                      <span className=" text-gray-600">{appt.reason}</span>
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold text-blue-950">Date:</span>
                      <span className="text-gray-600">
                        {new Date(appt.date).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(appt._id)}
                  className="text-white cursor-pointer btn btn-error "
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default MyAppointmentsPage;
