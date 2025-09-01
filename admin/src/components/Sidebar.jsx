import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { FiCalendar, FiFileText } from "react-icons/fi";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  return (
    <div className="min-h-[100vh] bg-white border-r">
      {atoken && (
        <ul className="text-[#515151]">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff]" : ""
              }`
            }
            to={"/admin-dashbord"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">التقارير و الاحصائات</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff]" : ""
              }`
            }
            to={"/all-appointment"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">الحجوزات</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff]" : ""
              }`
            }
            to={"/add-doctor"}
          >
            <img src={assets.add_icon} alt="" />
            <p className="hidden md:block">أضاف طبيب جديد</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff]" : ""
              }`
            }
            to={"/doctor-list"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">قأمة الأطباء</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-l-4 border-[#5f6fff]" : ""
              }`
            }
            to={"/add-report"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">قأمة الأطباء</p>
          </NavLink>
        </ul>
      )}

      {dtoken && (
        <ul className="text-[#515151]">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-[#5f6fff]" : ""
              }`
            }
            to={"/doctor-dashbord"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">التقارير و الاحصائات </p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-[#5f6fff]" : ""
              }`
            }
            to={"/doctor-profile"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">الحساب الشخصي</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-[#5f6fff]" : ""
              }`
            }
            to={"/doctor-appointments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">الحجوزات</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-[#5f6fff]" : ""
              }`
            }
            to={"/doctor-consultation"}
          >
            <FiCalendar className="text-2xl" />
            <p className="hidden md:block">الأستشارات</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-[#5f6fff]" : ""
              }`
            }
            to={"/report"}
          >
            <FiFileText className="text-2xl" />
            <p className="hidden md:block">التقارير</p>
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
