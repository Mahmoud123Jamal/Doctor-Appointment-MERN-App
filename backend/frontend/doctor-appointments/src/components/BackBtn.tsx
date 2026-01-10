import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi"; // Optional: npm install react-icons

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="btn btn-ghost lg:hidden gap-2 normal-case hover:bg-base-200 transition-all duration-200"
    >
      <HiArrowLeft className="w-5 h-5" />
      <span>Back</span>
    </button>
  );
};
