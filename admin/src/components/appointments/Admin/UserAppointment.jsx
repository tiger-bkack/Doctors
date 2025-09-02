import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContext";
import { Dropdown, DropdownItem } from "flowbite-react";
import { NavLink, useParams } from "react-router-dom";

import { useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { assets } from "../../../assets/assets";

const UserAppointment = () => {
  const {
    atoken,
    cancelAppointment,
    appointment,
    getUserAppointmenttWithDoctorFromAdmin,
  } = useContext(AdminContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const { userId } = useParams();
  const getAppointment = async () => {
    try {
      await getUserAppointmenttWithDoctorFromAdmin(userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (atoken) {
      getAppointment();
    }
  }, [atoken]);

  return (
    <div dir="rtl" className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">
        كل الحجوزات التي قام بها المريض
      </p>
      <div className="bg-white border border-gray-100  rounded max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col border-b border-gray-100 px-6 py-3 ">
          <p className="hidden md:block">#</p>
          <p>الماريض</p>
          <p>العمر</p>
          <p className="hidden md:block">التاريخ & الوقت </p>
          <p>الطبيب</p>
          <p>سعر </p>
          <p>الحاله</p>
        </div>

        {appointment.map((item, index) => (
          <div className="flex flex-wrap justify-between sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] text-gray-500 items-center py-3 px-6 border-b border-gray-100 hover:bg-gray-50">
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
            {item.cancelled ? (
              <p className="text-red-500 text-xs font-medium">تم ألغاء الكشف</p>
            ) : item.isCompleted ? (
              <div className="flex items-center gap-2">
                <p className="text-green-600 text-xs font-medium">تم الكشف</p>
                <Dropdown inline className="px-3 py-3 !bg-gray-200 ">
                  <DropdownItem>
                    <NavLink to={`/user-report/${item.userData._id}`}>
                      عرض التقارير
                    </NavLink>
                  </DropdownItem>
                  {userId === item.userData._id ? (
                    ""
                  ) : (
                    <DropdownItem>
                      <NavLink to={`/user-appointment/${item.userData._id}`}>
                        عرض الحجزات
                      </NavLink>
                    </DropdownItem>
                  )}

                  <DropdownItem>عرض أستشارة</DropdownItem>
                </Dropdown>
              </div>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className="w-9 cursor-pointer"
                src={assets.cancel_icon}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAppointment;
