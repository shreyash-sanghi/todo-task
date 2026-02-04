import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { axiosInstance } from "../../API/axiosApi";

function Login() {
  const { authUser, setAuthUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axiosInstance.post("/user/login", userInfo);
      if (response.data) {
        toast.success("Login successful");
        localStorage.setItem("Task-Creat", response?.data?.data?.token);
        setAuthUser(response?.data?.data?.user);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.response.data.error);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Login
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Welcome back, please sign in
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                Email is required
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border rounded-md py-2 pl-10 pr-10 focus:outline-none focus:ring-1 focus:ring-gray-400"
                {...register("password", { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                Password is required
              </p>
            )}
          </div>

          {/* Forgot */}
          <div className="text-right">
            <a href="#" className="text-sm text-gray-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-800 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-900 transition disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : (
              <>
                <IoLogIn />
                Login
              </>
            )}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 pt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-gray-800 font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
