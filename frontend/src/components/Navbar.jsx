import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navgate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navgate("/");
  };

  return (
    <div
      dir="rtl"
      className="flex items-center justify-between text-sm py-2 mb-5 border-b border-b-gray-400 "
    >
      <NavLink to="/">
        <div className="flex items-center gap-2">
          <img className="w-10" src={assets.logo} alt="" />
          <div className="w-22 sm:w-26 cursor-pointer flex flex-col ">
            <p className="text-2xl font-bold text-gray-600">سلامتك</p>
            <p className="text-xs font-medium text-gray-400">راحة . طمأنينة</p>
          </div>
        </div>
      </NavLink>
      <div dir="rtl" className="">
        <ul className="hidden md:flex gap-5 items-center font-medium">
          <NavLink to="/">
            <li className="py-1 hover:text-gray-600 transition-all duration-100">
              الصفحة الرئيسية
            </li>
            <hr className="border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto  hidden" />
          </NavLink>
          <NavLink to="/doctors">
            <li className="py-1 hover:text-gray-600 transition-all duration-100">
              كل الأطباء{" "}
            </li>
            <hr className="border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/about">
            <li className="py-1 hover:text-gray-600 transition-all duration-100">
              من نحن
            </li>
            <hr className="border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden   " />
          </NavLink>
          <NavLink to="/contact">
            <li className="py-1 hover:text-gray-600 transition-all duration-100">
              تواصل معنا
            </li>
            <hr className="border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden" />
          </NavLink>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-2.5 " src={assets.dropdown_icon} alt="" />
            <img
              className="w-8 h-8 rounded-full"
              src={userData ? userData.image : assets.profile_pic}
              alt=""
            />
            <div className="absolute top-0 left-0 pt-14 text-base text-gray-600 font-medium z-20 hidden group-hover:block ">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navgate("/profile")}
                  className="hover:text-black cursor-pointer"
                >
                  الملف الشخصي
                </p>
                <p
                  onClick={() => navgate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  حجوزاتي
                </p>
                <p
                  onClick={() => navgate("/reports")}
                  className="hover:text-black cursor-pointer"
                >
                  تقاريري
                </p>
                <p
                  onClick={logout}
                  className="hover:text-red-800 cursor-pointer text-red-700"
                >
                  تسجيل الخروج
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navgate("/login")}
            className="py-3 px-8 cursor-pointer bg-[#5f6fff] hover:bg-[#5f6fffd2] text-white rounded-full hidden md:block"
          >
            أنشاء حسابك الأن
          </button>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="transition-all w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">الصفحة الرئسية</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">الأطباء</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">من نحن</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">تواصل معنا</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
