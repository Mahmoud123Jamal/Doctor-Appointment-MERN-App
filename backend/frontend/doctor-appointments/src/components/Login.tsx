import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { LoginFormInputs } from "../types/FormInputsTypes";
import { LoadingDots } from "./Loadings";
import { useToast } from "../hooks/useToast";
function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setServerError("");
    setIsSubmitting(true);

    try {
      const res = await api.post("/users/login", {
        email: data.email,
        password: data.password,
      });

      if (res.data.status !== "success") {
        setServerError(res.data.data?.message || "Login failed");
        error("Error logging in.", res.data.data?.message);
        return;
      }

      const token = res.data.data.token;
      login(token);
      success("Login successful.");
      navigate("/");
    } catch (err: any) {
      error("Error logging in.", err.response?.data);
      setServerError(err.response?.data?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-950">
          Login
        </h2>

        {serverError && (
          <p className="text-red-600 text-center mb-3">{serverError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered input-primary w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="input input-bordered input-primary w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full rounded-full"
          >
            {isSubmitting ? <LoadingDots /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
