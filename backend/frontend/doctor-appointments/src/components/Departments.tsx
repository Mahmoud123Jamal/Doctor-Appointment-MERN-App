import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Department } from "../types/DepartmentType";
import { useToast } from "../hooks/useToast";
import { LoadingDots } from "./Loadings";
function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<null | string>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { success, error } = useToast();
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setErrors(null);
        setLoading(true);

        const res = await api.get("/departments/allDepartments");

        if (res.data.status === "fail" || res.data.status === "error") {
          setErrors(res.data.data?.message || res.data.message);
          error("Error fetching departments", res.data.data?.message);
          return;
        }

        // Extract departments array from data
        const departmentList = res.data.data.departments;

        if (!departmentList || !Array.isArray(departmentList)) {
          setErrors("Invalid data format received");
          error("Invalid data format received");
          return;
        }

        setDepartments(departmentList);

        if (departmentList.length > 0) {
          setActiveTab(departmentList[0]._id);
        }
      } catch (err) {
        error("Network error: Unable to load departments");

        setErrors("Network error: Unable to load departments");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);
  const showMsg = (name: string) => {
    success("Read about " + name + "department");
  };
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <LoadingDots />
        </div>
      ) : errors ? (
        <div className="text-red-500">Error: {errors}</div>
      ) : (
        <div>
          {departments.length === 0 ? (
            <div>No departments available.</div>
          ) : (
            <section className="w-full bg-blue-50 py-10 mx-auto px-4 rounded-xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 text-blue-950">
                  Departments
                </h2>
                <p className="text-gray-600">
                  Explore our various medical departments
                </p>
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Sidebar */}
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <ul>
                    {departments.map((dept) => (
                      <li key={dept._id}>
                        <button
                          className={`w-full text-left px-4 py-2 rounded transition mb-1 cursor-pointer ${
                            activeTab === dept._id
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-800 hover:bg-blue-100"
                          }`}
                          onClick={() => {
                            setActiveTab(dept._id);
                            showMsg(dept.name);
                          }}
                        >
                          {dept.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:w-3/4 md:pl-6">
                  {departments.map((dept) =>
                    activeTab === dept._id ? (
                      <div key={dept._id}>
                        <h3 className="text-2xl text-blue-950 font-semibold mb-4">
                          {dept.name}
                        </h3>

                        <p className="text-gray-700 mb-4">{dept.description}</p>

                        {dept.image && (
                          <img
                            src={`http://localhost:5000${dept.image}`}
                            alt={dept.name}
                            className="w-full h-90 rounded shadow"
                          />
                        )}
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default Departments;
