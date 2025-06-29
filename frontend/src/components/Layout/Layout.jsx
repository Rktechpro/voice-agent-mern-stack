import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  ChevronDown,
  LogOut,
  SquarePen,
  LayoutIcon,
} from "lucide-react";
import { Usecontext } from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { HistoryOutlined } from "@ant-design/icons";

const Layout = () => {
  const { userData, setUserData, Url } = useContext(Usecontext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${Url}/api/authRouter/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
        setUserData(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  return (
    <div className="bg-[#0b0022] text-white font-sans sticky top-0 z-50">
      <header className="sticky top-0 z-50 bg-[#0b0022] px-6 md:px-10 py-4 flex justify-between items-center">
        <h1
          onClick={() => navigate("/homepage")}
          className="text-2xl font-bold text-red-500 cursor-pointer"
        >
          Voice Agent
        </h1>

        {/* Desktop View */}
        <div className="hidden md:flex space-x-4 items-center relative">
          {!userData ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 border border-pink-500 cursor-pointer rounded hover:bg-pink-500"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/singup")}
                className="px-4 py-2 bg-pink-600 cursor-pointer rounded hover:bg-pink-700"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-pink-500 rounded hover:bg-pink-500 cursor-pointer"
              >
                <User size={18} />
                {userData.name || "User"}
                <ChevronDown size={18} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-[#150024] border border-pink-500 rounded shadow-lg w-40 z-10 p-2 space-y-2 text-sm">
                  <button
                    className="w-full text-left hover:text-red-400 flex items-center gap-2 cursor-pointer relative"
                    onClick={() => navigate("/history")}
                  >
                    <HistoryOutlined />
                    History
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/customize");
                    }}
                    className="w-full text-left hover:text-red-400 flex items-center gap-2 cursor-pointer"
                  >
                    <SquarePen size={16} /> Cutomize
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left hover:text-red-400 flex items-center gap-2 cursor-pointer "
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-pink-400"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#150024] px-6 py-4 flex flex-col space-y-4">
          {!userData ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="border border-pink-500 px-4 py-2 rounded cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-pink-600 px-4 py-2 rounded cursor-pointer "
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/customize");
                }}
                className="border px-4 py-2 rounded text-red-400 cursor-pointer"
              >
                Cutomize
              </button>
              <button
                className="border px-4 py-2 rounded text-red-400 cursor-pointer"
                onClick={() => navigate("/history")}
              >
                History
              </button>
              <button
                onClick={handleLogout}
                className="border px-4 py-2 rounded text-red-400 cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Layout;
