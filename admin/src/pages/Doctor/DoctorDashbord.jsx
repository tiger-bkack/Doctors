import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const DoctorDashbord = () => {
  const {
    getDoctorDashbord,
    dtoken,
    dashData,
    cancelAppointment,
    completeAppointment,
    loader,
    docInfo,
    getDoctorProfile,
    getAppointments,
    completeConsultation,
    cancelConsultation,
  } = useContext(DoctorContext);
  const { currency, slotDateFormat, formatDate } = useContext(AppContext);
  const navgate = useNavigate();

  useEffect(() => {
    if (dtoken) {
      getAppointments();
      getDoctorDashbord();
      getDoctorProfile();
    }
  }, [dtoken]);
  return (
    dashData && (
      <div className="m-5">
        <div className=" flex flex-wrap gap-5">
          <div
            onClick={() => navgate("/doctor-list")}
            className="flex items-center gap-2 bg-white cursor-pointer rounded p-4 min-w-52 border-2 border-gray-100 hover:scale-105 transition-all duration-300"
          >
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div className="">
              <p className="text-gray-600 text-xl font-semibold">
                {dashData.earnings_appointment} {currency}
              </p>
              <p className="text-gray-400">الأرباح</p>
            </div>
          </div>

          <div
            onClick={() => navgate("/all-appointment")}
            className="flex items-center gap-2 bg-white cursor-pointer rounded p-4 min-w-52 border-2 border-gray-100 hover:scale-105 transition-all duration-300"
          >
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div className="">
              <p className="text-gray-600 text-xl font-semibold">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">الحجوزات</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white cursor-pointer rounded p-4 min-w-52 border-2 border-gray-100 hover:scale-105 transition-all duration-300">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div className="">
              <p className="text-gray-600 text-xl font-semibold">
                {dashData.patients}
              </p>
              <p className="text-gray-400">المرضي</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 mt-2.5">
          <div
            onClick={() => navgate("/doctor-list")}
            className="flex items-center gap-2 bg-white cursor-pointer rounded p-4 min-w-52 border-2 border-gray-100 hover:scale-105 transition-all duration-300"
          >
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div className="">
              <p className="text-gray-600 text-xl font-semibold">
                {dashData.earnings_consultation} {currency}
              </p>
              <p className="text-gray-400 ">أرباح الأستشارات</p>
            </div>
          </div>

          <div
            onClick={() => navgate("/all-appointment")}
            className="flex items-center gap-2 bg-white cursor-pointer rounded p-4 min-w-52 border-2 border-gray-100 hover:scale-105 transition-all duration-300"
          >
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div className="">
              <p className="text-gray-600 text-xl font-semibold">
                {dashData.patients_Consultation}
              </p>
              <p className="text-gray-400">الأستشارات</p>
            </div>
          </div>
        </div>
        <div className="mt-2 min-h-[50vh] max-h-[70vh] overflow-y-scroll">
          <div className="bg-white">
            <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-100 ">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold">
                {" "}
                {`أخر الحجوزات بي  ${docInfo.name}`}
              </p>
            </div>
            <div className="pt-4 border border-t-0  border-gray-100">
              {dashData.latestAppointments.map((items, index) => (
                <div
                  key={index}
                  className="flex items-center px-6 py-3 gap-4 hover:bg-gray-100 transition-all duration-200"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={items.userData.image}
                    alt=""
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {items.userData.name}
                    </p>
                    <p className="text-gray-600">
                      {slotDateFormat(items.slotDate)}
                    </p>
                  </div>

                  {items.cancelled ? (
                    <p className="text-red-400 font-medium text-sm">
                      تم ألغاء الكشف
                    </p>
                  ) : items.isCompleted ? (
                    <p className="text-green-500 text-sm font-medium">
                      تم الكشف
                    </p>
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

          <div className="bg-white">
            <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-100 ">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold">
                {" "}
                {`أخر الأستشارات بي ${docInfo.name}`}
              </p>
            </div>
            <div className="pt-4 border border-t-0  border-gray-100">
              {dashData.latestConsultation.map((items, index) => (
                <div
                  key={index}
                  className="flex items-center px-6 py-3 gap-4 hover:bg-gray-100 transition-all duration-200"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={items.userData.image}
                    alt=""
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {items.userData.name}
                    </p>
                    <p className="text-gray-600 ">
                      {formatDate(items.consultDay)} -{" "}
                      {items.consultTime
                        ? items.consultTime
                        : "لم يقم المريض بتحديد الوقت بعد"}
                    </p>
                  </div>

                  {items.cancelled ? (
                    <p className="text-red-400 font-medium text-sm">
                      تم ألغاء الأستشاراة
                    </p>
                  ) : items.isCompleted ? (
                    <p className="text-green-500 text-sm font-medium">
                      تمت الأستشاراة
                    </p>
                  ) : (
                    <div className=" flex gap-0.5">
                      {loader ? "جاري التنفيز" : ""}
                      <img
                        onClick={() =>
                          cancelConsultation(items._id, items.userId)
                        }
                        className="w-10 cursor-pointer"
                        src={assets.cancel_icon}
                        alt=""
                      />
                      <img
                        onClick={() =>
                          completeConsultation(items._id, items.userId)
                        }
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
        </div>
      </div>
    )
  );
};

export default DoctorDashbord;
