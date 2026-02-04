import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { axiosInstance } from "../../API/axiosApi";

function Signup() {
  const { authUser, setAuthUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    const userInfo = {
      name: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axiosInstance.post("/user/signup", userInfo);
      if (response.data) {
        toast.success("Signup successful");
        localStorage.setItem("Task-Creat", response?.data?.data?.token);
        setAuthUser(response?.data?.data?.user);
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
          Create Account
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                {...register("fullname", { required: true })}
              />
            </div>
            {errors.fullname && (
              <p className="text-xs text-red-500 mt-1">
                Full name is required
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email
            </label>
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
            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition disabled:opacity-60"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-gray-600 pt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-gray-800 font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
