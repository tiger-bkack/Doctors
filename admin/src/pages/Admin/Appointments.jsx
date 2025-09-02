import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { Dropdown, DropdownItem } from "flowbite-react";
import { NavLink } from "react-router-dom";

import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const Appointments = () => {
  const { atoken, getAppointment, cancelAppointment, appointment } =
    useContext(AdminContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getAppointment();
    }
  }, [atoken]);
  return (
    <div dir="rtl" className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">كل الحجوزات </p>
      <div className="bg-white border border-gray-100  rounded-2xl max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr_1fr_0.5fr] grid-flow-col border-b border-gray-100 px-6 py-3 ">
          <p className="hidden md:block">#</p>
          <p>الماريض</p>
          <p>العمر</p>
          <p className="hidden md:block">التاريخ & الوقت </p>
          <p>الطبيب</p>
          <p>سعر </p>
          <p>الحاله</p>
        </div>

        {appointment.map((item, index) => (
          <div className="flex flex-wrap justify-between sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr_1fr_0.5fr] text-gray-500 items-center py-3 px-6 border-b border-gray-100 hover:bg-gray-50">
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-3">
              <img
                className="w-8 h-8 rounded-full"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>
            <p>{calculateAge(item.userData.dob)}</p>
            <p className="hidden md:block">
              {slotDateFormat(item.slotDate)} ,{item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full"
                src={item.docData.image}
                alt={item.docData.image}
              />
              <p>{item.docData.name}</p>
            </div>
            <p>
              {item.amount} {currency}
            </p>
            <div className="">
              {item.cancelled ? (
                <p className="text-red-500 text-xs font-medium">
                  تم ألغاء الكشف
                </p>
              ) : item.isCompleted ? (
                <p className="text-green-600 text-xs font-medium">تم الكشف</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-9 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
              )}
            </div>
            <div className="">
              <Dropdown
                inline
                className="px-3 py-3 !bg-gray-200 rounded-2xl drop-shadow-2xl "
              >
                <DropdownItem className="hover:bg-white hover:rounded-2xl transition-all ease-in duration-100">
                  <NavLink to={`/user-report/${item.userData._id}`}>
                    عرض التقارير
                  </NavLink>
                </DropdownItem>
                <DropdownItem className="hover:bg-white hover:rounded-2xl transition-all ease-in duration-100">
                  <NavLink to={`/user-appointment/${item.userData._id}`}>
                    عرض الحجزات
                  </NavLink>
                </DropdownItem>
                <DropdownItem className="hover:bg-white hover:rounded-2xl transition-all ease-in duration-100">
                  <NavLink to={`/user-consultation/${item.userData._id}`}>
                    عرض أستشارة
                  </NavLink>
                </DropdownItem>
              </Dropdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
