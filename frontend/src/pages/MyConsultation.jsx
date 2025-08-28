import { AppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyConsultation = () => {
  const { backendUrl, token, slotDateFormat, to12HourFormat, formatDate } =
    useContext(AppContext);

  const [consultation, setConsultation] = useState([]);

  const getConsultation = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/all-consaltation",
        {},
        { headers: { token } }
      );

      if (data.success) {
        console.log(data.consaltationData);
        setConsultation(data.consaltationData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getConsultation();
  }, [token]);
  return (
    <div dir="rtl">
      <div className="">
        {consultation.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div className="">
              <img
                className="w-32 bg-indigo-50"
                src={item.appointmentData.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.appointmentData.docData.name}
              </p>
              <p>{item.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">العنوان :</p>
              <p className="text-xs">
                {item.appointmentData.docData.address.line1}
              </p>
              <p className="text-xs">
                {item.appointmentData.docData.address.line2}
              </p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium ">
                  تاريخ الاستشارة & وقت الاستشارة :
                </span>{" "}
                {formatDate(item.consultDay)} | {item.consultTime}
              </p>
            </div>
            <div className=""></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.isCompleted && (
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#5f6fff] hover:text-white transition-all duration-300 cursor-pointer">
                  ادفع اون لاين
                </button>
              )}
              {!item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  ألغاء الحجز
                </button>
              )}
              {item.isCompleted && (
                <div className="flex flex-col gap-3">
                  <button className="sm:min-w-48 py-2 border border-[#5f6fff] hover:bg-[#5f6fff]  transition-all duration-300 hover:text-white rounded text-[#5f6fff] cursor-pointer">
                    استشارة
                  </button>

                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500 hover:bg-green-500  transition-all duration-300 hover:text-white cursor-pointer">
                    تم الكشف
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyConsultation;
