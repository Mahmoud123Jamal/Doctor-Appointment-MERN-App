import api from "../api/axios";
import { use } from "react";
import { Suspense } from "react";
import type { StatusData } from "../types/StatusDataType";
import { FaUserDoctor } from "react-icons/fa6";
import { CgAwards } from "react-icons/cg";
import { FaHospital } from "react-icons/fa";
import { MdOutlineScience } from "react-icons/md";

const statusPromise = (async (): Promise<StatusData> => {
  const doctorRes = await api.get("/doctors/count");
  const deptRes = await api.get("/departments/count");

  return {
    doctorCount: doctorRes.data.data.count || 0,
    departmentsCount: deptRes.data.data.count || 0,
  };
})();

function Status() {
  const { doctorCount, departmentsCount } = use(statusPromise);
  const status = [
    {
      icon: <FaUserDoctor />,
      label: "Doctors",
      count: doctorCount,
    },
    {
      icon: <FaHospital />,
      label: "Departments",
      count: departmentsCount,
    },
    {
      icon: <MdOutlineScience />,
      label: "Research Labs",
      count: 12,
    },
    {
      icon: <CgAwards />,
      label: "Awards",
      count: 10,
    },
  ];
  return (
    <section className="flex flex-wrap justify-center gap-4 mb-4 ">
      {status.map((item, index) => (
        <div
          key={index}
          className="card bg-blue-50 hover:bg-blue-200 hover:scale-105 cursor-pointer shadow-sm rounded-lg py-5 px-2 w-54 transition-all duration-700"
        >
          <div className="flex items-center gap-2">
            <div className="avatar placeholder">
              <div className="bg-accent text-primary-content rounded-full w-12 h-12 flex items-center justify-center">
                <i className="text-blue-900 text-xl">{item.icon}</i>
              </div>
            </div>

            <div className="leading-tight">
              <h2 className="font-semibold text-base">{item.count}</h2>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default function StatusWrapper() {
  return (
    <Suspense
      fallback={<div className="loading loading-dots loading-xl"></div>}
    >
      <Status />
    </Suspense>
  );
}
