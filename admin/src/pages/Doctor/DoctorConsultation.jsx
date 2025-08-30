import { assets } from "@/assets/assets";
import { AppContext } from "@/context/AppContext";
import { DoctorContext } from "@/context/DoctorContext";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "flowbite-react";

const DoctorConsultation = () => {
  const {
    getConsultation,
    dtoken,
    consultation,

    docInfo,
    getAppointments,
    getDoctorDashbord,
    getDoctorProfile,
    completeConsultation,
    cancelConsultation,
  } = useContext(DoctorContext);

  const { calculateAge, formatDate } = useContext(AppContext);
  const [loadingActions, setLoadingActions] = useState({});

  const handleCompleteConsultation = async (id, userId) => {
    setLoadingActions((prev) => ({ ...prev, [id]: true }));
    await completeConsultation(id, userId);
    setLoadingActions((prev) => ({ ...prev, [id]: false }));
  };

  const handleCancelConsultation = async (id, userId) => {
    setLoadingActions((prev) => ({ ...prev, [id]: true }));
    await cancelConsultation(id, userId);
    setLoadingActions((prev) => ({ ...prev, [id]: false }));
  };

  useEffect(() => {
    if (dtoken) {
      getConsultation();
      getAppointments();
      getDoctorDashbord();
      getDoctorProfile();
    }
  }, [dtoken]);

  return (
    consultation && (
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 font-medium text-lg">{`كل الأستشارات الخاصه بي ${docInfo.name}`}</p>

        <div className="bg-white border border-gray-200 rounded max-h-[80vh] min-h-[60vh] overflow-y-scroll">
          {/*------Table Headers------ */}
          <div className="max-sm:hidden py-3 px-6 grid grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr_1fr_1fr_1fr] gap-1 border-b border-gray-200 text-gray-500 hover:bg-gray-50 transition-all duration-150">
            <p>#</p>
            <p>إسم المريض</p>
            <p>حالة الدفع</p>
            <p>العمر</p>
            <p className="hidden md:block">تاريخ الاستشارة</p>
            <p className="hidden md:block">وقت الاستشارة</p>
            <p className="">تكلفة الأستشارة</p>
            <div className="flex items-center justify-center">
              <p>الحالة</p>
            </div>
          </div>

          {consultation.map((items, index) => (
            <div
              key={items._id}
              className="flex flex-wrap justify-between  sm:grid  text-base py-3 px-6 grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr_1fr_1fr_1fr] gap-1  items-center border-b border-gray-200 text-gray-500 hover:bg-gray-50 transition-all duration-150"
            >
              <p className="hidden md:block">{index + 1}</p>
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={items?.userData?.image}
                  alt={items?.userData?.image}
                />
                <p>{items.userData.name}</p>
              </div>
              <div>
                <p
                  className={`text-xs inline border ${
                    items.payment ? "border-[#5f6fff]" : "border-[#ff8c6f]"
                  } px-2 rounded-full`}
                >
                  {items.payment ? "أون لاين" : "كاش"}
                </p>
              </div>
              <p className="hidden md:block">
                {calculateAge(items.userData.dob)}
              </p>
              <p className="hidden md:block">{formatDate(items.consultDay)}</p>
              <p className="text-[#5f6fff]">
                {items.consultTime ? (
                  items.consultTime
                ) : (
                  <p className="text-[#ff8c6f]">لم يحدد بعد</p>
                )}
              </p>
              <p>{items.amount}</p>

              <div className="flex justify-center items-center">
                {items.cancelled ? (
                  <p className="text-red-400 font-medium text-sm">
                    تم ألغاء الكشف
                  </p>
                ) : items.isCompleted ? (
                  <p className="text-green-500 text-sm font-medium">تم الكشف</p>
                ) : (
                  <div className="flex gap-0.5 ">
                    {loadingActions[items._id] ? (
                      <p className="flex items-center gap-2">
                        <span>جاري التنفيذ...</span>
                        <Spinner
                          aria-label="Default status example"
                          size="md"
                        />
                      </p>
                    ) : (
                      <div className="w-full flex items-center justify-center gap-2">
                        <img
                          onClick={() =>
                            handleCancelConsultation(items._id, items.userId)
                          }
                          className="w-10 cursor-pointer"
                          src={assets.cancel_icon}
                          alt="cancel"
                        />
                        <img
                          onClick={() =>
                            handleCompleteConsultation(items._id, items.userId)
                          }
                          className="w-10 cursor-pointer"
                          src={assets.tick_icon}
                          alt="complete"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default DoctorConsultation;
