import React, { useContext, useState } from "react";
import first from "../../assets/img/1.jpg";
import { Link, Navigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import axios from "axios";
import { Usecontext } from "../../context/UserContext";
import { toast } from "react-toastify";

const Login = () => {
  const { Url, setUserData } = useContext(Usecontext);
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formdata.email || !formdata.password) {
      toast.warn("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${Url}/api/authRouter/login`,
        formdata,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setUserData(response.data);
        <Navigate to="/" />;
        toast.success(response.data.message || "Login successful!");
      } else {
        toast.error(response.data.message || "Login failed.");
      }
    } catch (error) {
      setUserData(null);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#0b0022] via-[#1a0033] to-[#1a001f] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0000001a] backdrop-blur-md p-6 sm:p-8 rounded-lg shadow-lg border border-b-orange-500 border-t-violet-700 border-l-pink-700 border-r-green-600">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-200">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formdata.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10 text-white bg-transparent"
                placeholder="Enter your password"
                required
              />
              <div
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeFilled className="text-xl" />
                ) : (
                  <EyeInvisibleFilled className="text-xl" />
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#44c9ac5f] text-white p-2 rounded-md hover:bg-[#fb00ff51] transition duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link to="/singup" className="text-blue-400 hover:underline cursor-pointer">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
