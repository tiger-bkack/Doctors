import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const MyAppointments = () => {
  const { token, backendUrl, getDoctorList } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const month = [
    "",
    "يناير",
    "فبراير",
    "مارس",
    "إبريل",
    "مايو",
    "يونو",
    "يليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + month[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  const getAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        backendUrl + "/api/user/list-appointment",
        {
          headers: { token },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
        //console.log(data.appointments);
      } else {
        toast.warn(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      // setLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getDoctorList();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);
  return (
    <div dir="rtl">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">حجوزاتي</p>
      {loading ? (
        <div className="flex items-center justify-center text-2xl">
          <p>جاري التحميل</p>
        </div>
      ) : (
        ""
      )}
      <div className="">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div className="">
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">العنوان :</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium ">
                  تاريخ الحجز & وقت الحجز :
                </span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div className=""></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && !item.isCompleted && !item.payment && (
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#5f6fff] hover:text-white transition-all duration-300 cursor-pointer">
                  ادفع اون لاين
                </button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  ألغاء الحجز
                </button>
              )}
              {item.cancelled && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500 cursor-pointer">
                  تم ألغاء الحجز
                </button>
              )}
              {item.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500 cursor-pointer">
                  تم الكشف
                </button>
              )}
              {item.payment && (
                <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500 cursor-pointer">
                  تم الدفع
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
