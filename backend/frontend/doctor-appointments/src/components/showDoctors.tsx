import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Doctor } from "../types/DoctorType";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

function ShowDoctors() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
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

        setDoctors(allDoctors.slice(0, 3));
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
      <h1 className="text-center font-bold text-3xl mb-3 ">Our doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="card card-side shadow-xl hover:shadow-2xl  hover:scale-105 transition-all duration-500 cursor-pointer rounded-lg "
          >
            <figure className="w-24 h-30">
              <img
                src={
                  doctor.image instanceof FileList
                    ? URL.createObjectURL(doctor.image[0])
                    : doctor.image || "/avatar.jpg"
                }
                alt={doctor.name}
                className="w-full h-full object-cover rounded-l-lg"
              />
            </figure>
            <div className="card-body p-3">
              <h2 className="card-title text-sm font-bold">{doctor.name}</h2>
              <p className="text-xs text-gray-600">{doctor.specialization}</p>
              <p className="text-xs text-gray-500 mt-1">
                {doctor.description?.slice(0, 60)}...
              </p>
              <p className="text-xs font-semibold mt-1">
                Experience: {doctor.experience} years
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-4">
        <div className="flex justify-center mt-4">
          <Link
            to="/allDoctors"
            className="btn btn-primary flex items-center gap-2"
          >
            See All Doctors
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShowDoctors;
