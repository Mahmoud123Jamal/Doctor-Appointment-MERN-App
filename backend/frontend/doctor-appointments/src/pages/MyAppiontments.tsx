import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import type { Appointment } from "../types/AppointmentType";

function MyAppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
      } catch (err) {
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
    } catch {
      alert("Failed to delete appointment.");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-blue-600 font-semibold">
        Loading Appointments...
      </p>
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
        <h2 className="text-2xl font-bold mb-6 text-center">My Appointments</h2>
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
                className="flex items-center justify-between bg-white shadow p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={imageUrl}
                    alt={appt.doctor.name}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div>
                    <p className=" text-lg">
                      <span className="text-gray-600">Doctor :</span>{" "}
                      <span className="font-semibold">{appt.doctor.name}</span>
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Reason:</span>
                      {appt.reason}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Date:</span>
                      {new Date(appt.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(appt._id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
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
