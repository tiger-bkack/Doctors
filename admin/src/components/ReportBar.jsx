import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";

const ReportBar = () => {
  //const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  return (
    <div className="flex items-center justify-around text-sm  bg-gray-100 font-semibold">
      {dtoken && (
        <ul className="text-[#515151] flex">
          <NavLink
            className={({ isActive }) =>
              `flex  items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-80 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-b-4 border-[#5f6fff]" : ""
              }`
            }
            to={"/add-report"}
          >
            <img className="w-5" src={assets.home_icon} alt="" />
            <p className="hidden md:block">التقارير و الاحصائات </p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-b-4 border-[#5f6fff]" : ""
              }`
            }
            to={"/add-report"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">0000000000000000000000000الحجوزات</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-b-4 border-[#5f6fff]" : ""
              }`
            }
            to={"/add-report"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">الحساب الشخصي</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default ReportBar;
