import { useEffect, useState } from "react";
import type { showDoctor } from "../types/DoctorType";
import api from "../api/axios";
import { useParams } from "react-router-dom";

function DoctorDetails() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<showDoctor | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setServerError(null);
        setLoading(true);

        const res = await api.get(`/doctors/${id}`);
        const doctorData = res.data.data?.doctor;

        if (!doctorData || res.data.status !== "success") {
          setServerError(res.data.message || "Failed to fetch doctor details");
          return;
        }

        setDoctor(doctorData);
      } catch (err) {
        console.error("Error fetching doctor:", err);
        setServerError("Something went wrong while fetching doctor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-blue-600 font-semibold">
        Loading doctor details...
      </p>
    );
  }

  if (serverError) {
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        {serverError}
      </p>
    );
  }

  if (!doctor) {
    return (
      <p className="text-center mt-10 text-gray-600 font-medium">
        Doctor not found.
      </p>
    );
  }

  const imageSrc =
    typeof doctor.image === "string" ? doctor.image : "/avatar.jpg";

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-100">
      <div className="card w-full max-w-2xl bg-white shadow-xl rounded-xl p-6">
        <figure className="flex justify-center">
          <img
            src={imageSrc}
            alt={doctor.name}
            className="w-40 h-40 object-cover rounded-full shadow-md"
          />
        </figure>

        <div className="card-body text-center mt-4">
          <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
          <p className="text-blue-600 text-lg font-semibold mt-1">
            {doctor.specialization}
          </p>

          <p className="text-gray-700 mt-3 leading-relaxed">
            {doctor.description}
          </p>

          <p className="text-sm font-medium text-gray-600 mt-4">
            Experience:{" "}
            <span className="font-bold text-gray-800">
              {doctor.experience} years
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
