import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {
    getDashData,
    atoken,
    cancelAppointment,
    dashData,
    cancelledConsultation,
  } = useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);
  const navgate = useNavigate();

  useEffect(() => {
    if (atoken) {
      getDashData();
      cancelAppointment();
    }
  }, [atoken]);
  return (
    dashData && (
      <div className={`m-5 `}>
        <div className=" flex flex-wrap gap-5">
          <div
            onClick={() => navgate("/doctor-list")}
            className="flex items-center gap-2 bg-white cursor-pointer rounded p-4 min-w-52 border-2 border-gray-100 hover:scale-105 transition-all duration-300"
          >
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div className="">
              <p className="text-gray-600 text-xl font-semibold">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">الأطباء</p>
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
                {dashData.users}
              </p>
              <p className="text-gray-400">المرضي</p>
            </div>
          </div>
        </div>

        <div className=" flex flex-wrap gap-5 mt-5">
          <div
            onClick={() => navgate("/all-appointment")}
            className="flex items-center gap-2 bg-white cursor-pointer rounded p-4 min-w-52 border-2 border-gray-100 hover:scale-105 transition-all duration-300"
          >
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div className="">
              <p className="text-gray-600 text-xl font-semibold">
                {dashData.consultations}
              </p>
              <p className="text-gray-400">الأستشارات</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white cursor-pointer rounded p-4 min-w-52 border-2 border-gray-100 hover:scale-105 transition-all duration-300">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div className="">
              <p className="text-gray-600 text-xl font-semibold">
                {dashData.reporsts}
              </p>
              <p className="text-gray-400">التقارير</p>
            </div>
          </div>
        </div>
        <div className=" min-h-[50vh] max-h-[70vh] overflow-y-scroll">
          <div className="bg-white rounded-2xl">
            <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-100 ">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold">أخر الحجوزات</p>
            </div>
            <div className="pt-4 border border-t-0  border-gray-100">
              {dashData.lastAppointment.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center px-6 py-3 hover:bg-gray-100 transition-all duration-200"
                >
                  <img
                    className="w-15 h-15 rounded-full"
                    src={item.docData.image}
                    alt=""
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {item.docData.name}
                    </p>
                    <p className="text-gray-600">
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>

                  {item.cancelled ? (
                    <p className="text-[#ff8c6f] text-xs font-medium">
                      Cancelled
                    </p>
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

          <div className="bg-white rounded-2xl">
            <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-100 ">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold">أخر أستشارت</p>
            </div>
            <div className="pt-4 border border-t-0  border-gray-100">
              {dashData.lastConsultation.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center px-6 py-3 hover:bg-gray-100 transition-all ease-out duration-200 cursor-pointer"
                >
                  <img
                    className="w-15 h-15 rounded-full"
                    src={item.docData.image}
                    alt=""
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {item.docData.name}
                    </p>
                    <p className="text-gray-600">
                      {slotDateFormat(item.consultDay)}
                    </p>
                  </div>

                  {item.cancelled ? (
                    <p className="text-[#ff8c6f] text-xs font-medium">
                      Cancelled
                    </p>
                  ) : (
                    <img
                      onClick={() => cancelledConsultation(item._id)}
                      className="w-9 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
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

export default Dashboard;
