import React, { useContext, useEffect, useState } from "react";
import { Button, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateConsaltation = ({
  consaltation,
  appointmentId,
  setOpenModal,
  doctorInfo,
}) => {
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const { backendUrl, token, to12HourFormat, formatDate } =
    useContext(AppContext);

  const updateConsaltationTime = async (consaltationId, consultTime) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/update-ConsaltationTime",
        { consaltationId, consultTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        setOpenModal(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAvailableSlots = () => {
    if (!consaltation?.appointmentData?.docData?.start_booked) return;

    const { from, to, booking_period } =
      consaltation.appointmentData.docData.start_booked;

    let date = new Date(consaltation.consultDay);
    let startTime = new Date(date);
    startTime.setHours(from, 0, 0, 0);

    let endTime = new Date(date);
    endTime.setHours(to, 0, 0, 0);

    let timeSlots = [];
    let loopTime = new Date(startTime);

    while (loopTime < endTime) {
      let formattedTime = loopTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      timeSlots.push({
        dateTime: new Date(loopTime),
        time: formattedTime,
      });

      loopTime.setMinutes(loopTime.getMinutes() + booking_period);
    }

    setSlots(timeSlots);
  };

  useEffect(() => {
    if (
      consaltation &&
      consaltation?.appointmentId?.toString() === appointmentId?.toString()
    ) {
      getAvailableSlots();
    }
  }, [consaltation, appointmentId]);

  // ✅ لو الاستشارة مش موجودة أو object فاضي
  if (!consaltation || Object.keys(consaltation).length === 0) {
    return (
      <div>
        <ModalHeader className="h-15"></ModalHeader>
        <ModalBody>
          <div className="flex items-center justify-center text-lg">
            <p>لم يحدد الدكتور يوم الاستشارة بعد</p>
          </div>
        </ModalBody>
      </div>
    );
  }

  // ✅ لو الاستشارة مش لنفس الـ appointment
  if (consaltation.appointmentId?.toString() !== appointmentId?.toString()) {
    return (
      <div>
        <ModalHeader className="h-15"></ModalHeader>
        <ModalBody>
          <div className="flex items-center justify-center text-lg">
            <p>لا توجد استشارات لهذا الحجز</p>
          </div>
        </ModalBody>
      </div>
    );
  }

  // ✅ لو الاستشارة موجودة ومطابقة
  const { userData } = consaltation.appointmentData;

  return (
    <div>
      <ModalHeader>أختيار الوقت المناسب</ModalHeader>
      <ModalBody>
        <div>
          <div
            dir="rtl"
            className="grid grid-cols-2 gap-5 sm:grid-cols-1 md:grid-cols-2 pb-5 border-b-1 "
          >
            <div className="grid grid-cols-2 ">
              <div className="space-y-2 font-semibold">
                <p>أسم الطبيب :</p>
                <p>التخصص :</p>
                <p>مواعيد العمل :</p>
              </div>
              <div className="space-y-2 text-gray-700">
                <p>{doctorInfo.name}</p>
                <p>{doctorInfo.speciality}</p>
                <p>
                  من الساعة {to12HourFormat(doctorInfo.start_booked.from)} الي
                  الساعة {to12HourFormat(doctorInfo.start_booked.to)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="space-y-2 font-semibold">
                <p>أسم المريض :</p>
                <p>موعد الاستشاره :</p>
                <p>ملاحظات الطبيب :</p>
              </div>
              <div className="space-y-2 text-gray-700">
                <p>{userData.name}</p>
                <p>{formatDate(consaltation.consultDay)}</p>
                <p>
                  {consaltation.notes ? consaltation.notes : "لا يوجد ملاحظات"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-center">
            <p className="text-2xl">من فضلك أختر الموعد المناسب</p>
          </div>
          <div className="max-h-[10vh] min-h-[10vh] flex flex-row-reverse gap-3 items-center w-full overflow-x-scroll mt-4">
            {slots.map((slot, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(slot.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all ${
                  selectedTime === slot.time
                    ? "bg-[#5f6fff] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          className="cursor-pointer"
          disabled={!selectedTime}
          onClick={() => {
            updateConsaltationTime(consaltation._id, selectedTime);
          }}
        >
          تأكيد
        </Button>
        <Button
          className="cursor-pointer"
          onClick={() => setOpenModal(false)}
          color="alternative"
        >
          إلغاء
        </Button>
      </ModalFooter>
    </div>
  );
};

export default UpdateConsaltation;
