import { useEffect, useState } from "react";
import api from "../api/axios";
import type { showDoctor } from "../types/DoctorType";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

function ShowAllDoctors() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<showDoctor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setServerError(null);
        setLoading(true);

        const res = await api.get("/doctors/allDoctors");
        const allDoctors = res.data.data?.doctors;

        if (!allDoctors || res.data.status !== "success") {
          setServerError(res.data.message || "Failed to fetch doctors");
          return;
        }

        setDoctors(allDoctors);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setServerError("Something went wrong while fetching doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-blue-600 font-semibold">
        Loading doctors...
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

  if (doctors.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600 font-medium">
        No doctors found.
      </p>
    );
  }

  return (
    <div className="bg-blue-50 ">
      <h1 className="text-center text-blue-950 font-bold text-3xl mb-3 ">
        Our doctors
      </h1>
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 p-4">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="card lg:card-side bg-white shadow-sm cursor-pointer rounded-lg transition-all duration-700 hover:scale-95 hover:bg-blue-200 "
          >
            <figure>
              <img
                src={
                  typeof doctor.image === "string"
                    ? doctor.image
                    : "/avatar.jpg"
                }
                alt={doctor.name}
              />
            </figure>
            <div className="card-body p-3">
              <h2 className="card-title text-blue-950 text-sm font-bold">
                {doctor.name}
              </h2>
              <p className="text-xs text-gray-600">{doctor.specialization}</p>
              <p className="text-xs text-gray-500 mt-1">
                {doctor.description?.slice(0, 100)}...
              </p>
              <p className="text-xs text-blue-950 font-semibold mt-1">
                Experience: {doctor.experience} years
              </p>
              <div className="card-actions justify-end">
                <Link to={`/doctor/${doctor._id}`} className="btn btn-primary">
                  show details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-4">
        <div className="flex justify-center mt-4">
          <Link to="/" className="btn btn-primary flex items-center gap-2">
            <FaArrowLeft />
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShowAllDoctors;
