import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { FiCalendar, FiFileText } from "react-icons/fi";
import { DoctorContext } from "../context/DoctorContext";
import { MdAssignment } from "react-icons/md";
import { FaCalendarAlt, FaCalendarDay } from "react-icons/fa";
import { IoPersonAdd, IoHome } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  return (
    <div className="min-h-screen bg-white border-r">
      <div className="flex items-center justify-center md:my-5 sm:my-0 ">
        <img className="w-20 sm:hidden md:block" src={assets.logo} alt="" />
      </div>
      {atoken && (
        <ul className="text-[#515151]">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer group${
                isActive ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff]" : ""
              }`
            }
            to={"/admin-dashbord"}
          >
            {/* <img src={assets.home_icon} alt="" /> */}
            <IoHome
              className={`text-2xl group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            />
            <p
              className={`hidden md:block group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            >
              التقارير و الاحصائات
            </p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer group${
                isActive
                  ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff] text-[#5f6fff]"
                  : ""
              }`
            }
            to={"/all-appointment"}
          >
            {/* <img src={assets.appointment_icon} alt="" /> */}
            <FaCalendarAlt
              className={`text-3xl group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            />
            <p
              className={`hidden md:block group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            >
              الحجوزات
            </p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer group${
                isActive
                  ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff] text-[#5f6fff]"
                  : ""
              }`
            }
            to={"/all-consultation"}
          >
            {/* <img src={assets.appointment_icon} alt="" /> */}
            <FaCalendarDay
              className={`text-3xl group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            />
            <p
              className={`hidden md:block group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            >
              الأستشارات
            </p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer group${
                isActive
                  ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff] text-[#5f6fff]"
                  : ""
              }`
            }
            to={"/reports"}
          >
            {/* <img src={assets.home_icon} alt="" /> */}
            <MdAssignment
              className={`text-3xl group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            />
            <p
              className={`hidden md:block group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            >
              التقارير
            </p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer group${
                isActive
                  ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff] text-[#5f6fff]"
                  : ""
              }`
            }
            to={"/add-doctor"}
          >
            {/* <img src={assets.add_icon} alt="" /> */}
            <IoPersonAdd
              className={`text-2xl group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            />
            <p
              className={`hidden md:block group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            >
              أضاف طبيب جديد
            </p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer group${
                isActive
                  ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff] text-[#5f6fff]"
                  : ""
              }`
            }
            to={"/doctor-list"}
          >
            {/* <img src={assets.people_icon} alt="" /> */}
            <BsPeopleFill
              className={`text-2xl group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            />
            <p
              className={`hidden md:block group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            >
              قأمة الأطباء
            </p>
          </NavLink>
        </ul>
      )}

      {dtoken && (
        <ul className="text-[#515151]">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer group${
                isActive
                  ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff] text-[#5f6fff]"
                  : ""
              }`
            }
            to={"/doctor-dashbord"}
          >
            {/* <img src={assets.home_icon} alt="" /> */}
            <IoHome
              className={`text-2xl group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            />
            <p
              className={`hidden md:block group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            >
              التقارير و الاحصائات
            </p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer group${
                isActive
                  ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff] text-[#5f6fff]"
                  : ""
              }`
            }
            to={"/doctor-profile"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">الحساب الشخصي</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer group${
                isActive
                  ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff] text-[#5f6fff]"
                  : ""
              }`
            }
            to={"/doctor-appointments"}
          >
            {/* <img src={assets.appointment_icon} alt="" /> */}
            <FaCalendarAlt
              className={`text-3xl group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            />
            <p
              className={`hidden md:block group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            >
              الحجوزات
            </p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer group${
                isActive
                  ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff] text-[#5f6fff]"
                  : ""
              }`
            }
            to={"/doctor-consultation"}
          >
            <FaCalendarDay
              className={`text-3xl group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            />
            <p
              className={`hidden md:block group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            >
              الأستشارات
            </p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer group ${
                isActive ? "border-l-4 border-[#5f6fff] text-[#5f6fff]" : ""
              }`
            }
            to={"/report"}
          >
            <MdAssignment
              className={`text-3xl group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            />
            <p
              className={`hidden md:block group-hover:text-[#5f6fff] transition-all duration-100 ease-in`}
            >
              التقارير
            </p>
          </NavLink>

          {/* <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff]" : ""
              }`
            }
            to={"/add-report"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">أضافه تقارير المرضي</p>
          </NavLink> */}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
