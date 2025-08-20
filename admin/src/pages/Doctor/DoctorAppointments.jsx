import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

function DoctorAppointments() {
  const {
    getAppointments,
    appointment,
    dtoken,
    cancelAppointment,
    completeAppointment,
    loader,
    docInfo,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 font-medium text-lg">
        {`كل الحجوزات الخاصه بي   ${docInfo.name}`}
      </p>

      <div className="bg-white border border-gray-200 text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-gray-200">
          <p className="hidden md:block">#</p>
          <p>المريض</p>
          <p>حاله الدفع</p>
          <p>العمر</p>
          <p className="hidden md:block">الوقت & التاريخ</p>
          <p>سعر الكشف</p>
          <p>الحالة</p>
        </div>

        {appointment.map((items, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-5 text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center py-3 px-6 border-b border-gray-200 text-gray-500 hover:bg-gray-50 transition-all duration-150 "
          >
            <p className="hidden md:block">{index + 1}</p>
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full"
                src={items.userData.image}
                alt={items.userData.image}
              />{" "}
              <p>{items.userData.name}</p>
            </div>
            <div className="">
              <p
                className={`text-xs inline border ${
                  items.payment ? "border-[#5f6fff]" : "border-[#ff8c6f] "
                }  px-2 rounded-full`}
              >
                {items.payment ? "أون لاين" : "كاش"}
              </p>
            </div>
            <p className="hidden md:block">
              {calculateAge(items.userData.dob)}
            </p>
            <p>
              {slotDateFormat(items.slotDate)} , {items.slotTime}
            </p>
            <p>
              {items.amount} {currency}
            </p>

            {items.cancelled ? (
              <p className="text-red-400 font-medium text-sm">تم ألغاء الكشف</p>
            ) : items.isCompleted ? (
              <p className="text-green-500 text-sm font-medium">تم الكشف</p>
            ) : (
              <div className=" flex gap-0.5">
                {loader ? "جاري التنفيز" : ""}
                <img
                  onClick={() => cancelAppointment(items._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => completeAppointment(items._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorAppointments;
