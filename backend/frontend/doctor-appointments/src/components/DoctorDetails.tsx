import { useEffect, useState } from "react";
import type { showDoctor } from "../types/DoctorType";
import api from "../api/axios";
import { useParams, Link } from "react-router-dom";

function DoctorDetails() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<showDoctor | null>(null);
  const [relatedDoctors, setRelatedDoctors] = useState<showDoctor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
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

        // Fetch related doctors
        fetchRelatedDoctors(
          doctorData.specialization.toLowerCase(),
          doctorData._id
        );
      } catch (err) {
        setServerError("Something went wrong while fetching doctor details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedDoctors = async (
      specialization: string,
      doctorId: string
    ) => {
      try {
        setLoading(true);
        const res = await api.get(
          `/doctors/bySpecialization/${specialization}`
        );
        const all = res.data.data?.doctors || [];

        const filtered = all.filter((doc: showDoctor) => doc._id !== doctorId);

        setRelatedDoctors(filtered);
      } catch (error) {
        console.error("Error fetching related doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-10 text-blue-600 font-semibold">
        Loading...
      </p>
    );

  if (serverError)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        {serverError}
      </p>
    );

  if (!doctor)
    return <p className="text-center mt-10 text-gray-600">Doctor not found</p>;

  const imageSrc =
    typeof doctor.image === "string" ? doctor.image : "/avatar.jpg";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= Related Doctors ================= */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-bold text-gray-700 mb-3 text-center lg:text-left">
            Related Doctors
          </h3>

          {relatedDoctors.length === 0 ? (
            <p className="text-sm text-center text-gray-500">
              No related doctors
            </p>
          ) : (
            <div className="space-y-3">
              {relatedDoctors.map((doc) => (
                <Link
                  to={`/doctor/${doc._id}`}
                  key={doc._id}
                  className="flex items-center bg-white shadow-md rounded-lg p-3 hover:bg-blue-50 transition"
                >
                  <img
                    src={
                      typeof doc.image === "string" ? doc.image : "/avatar.jpg"
                    }
                    alt={doc.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {doc.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {doc.specialization}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* =================  Doctor Details ================= */}
        <div className="lg:col-span-2 flex justify-center">
          <div className="card w-full max-w-2xl bg-white shadow-xl rounded-xl p-6 transition-all duration-700 hover:scale-105 cursor-pointer hover:bg-blue-200">
            <figure className="flex justify-center">
              <img
                src={imageSrc}
                alt={doctor.name}
                className="w-40 h-40 object-cover rounded-full shadow-md"
              />
            </figure>

            <div className="card-body text-center mt-4">
              <h2 className="text-2xl font-bold text-blue-950">
                {doctor.name}
              </h2>

              <p className="text-blue-600 text-lg font-semibold mt-1">
                {doctor.specialization}
              </p>

              <p className="text-gray-700 mt-3 leading-relaxed">
                {doctor.description}
              </p>

              <p className="text-sm font-medium text-gray-600 mt-4">
                Experience:{" "}
                <span className="font-bold text-blue-950">
                  {doctor.experience} years
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
