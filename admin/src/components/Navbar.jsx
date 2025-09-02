import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { atoken, setAtoken } = useContext(AdminContext);
  const { dtoken, setDtoken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    atoken && setAtoken("");
    atoken && localStorage.removeItem("atoken");

    dtoken && setDtoken("");
    dtoken && localStorage.removeItem("dtoken");
  };
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-100 bg-white">
      <div className="flex items-center gap-0.5 text-xs">
        <img className="w-8 pl-1 " src={assets.logo} alt="" />
        <div className="w-19 sm:w-23 cursor-pointer flex flex-col ">
          <p className="text-lg font-bold text-[#5f6fff]">سلامـتك</p>
          <p className="text-xs text-gray-400">راحة . طمأنينة</p>
        </div>
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {atoken ? "المالك" : "طبيب"}
        </p>
      </div>

      <button
        onClick={() => logout()}
        className="bg-[#5f6fff] border-none text-white rounded-full px-10 py-2 text-sm cursor-pointer hover:bg-linear-to-bl from-violet-500 to-fuchsia-500 transition-all duration-200"
      >
        تسجل الخروج
      </button>
    </div>
  );
};

export default Navbar;
