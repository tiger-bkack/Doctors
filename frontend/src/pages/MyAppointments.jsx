import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import UpdateConsaltation from "../components/UpdateConsaltation";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

const MyAppointments = () => {
  const { token, backendUrl, getDoctorList } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [consaltation, setConsaltation] = useState({});
  const navigate = useNavigate();

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

  const getConsaltation = async (appointmentId, docId) => {
    try {
      setConsaltation(null);
      const { data } = await axios.post(
        backendUrl + "/api/user/consaltation",
        { appointmentId, docId },
        { headers: { token } }
      );

      if (data.success) {
        console.log(data.consaltaionData);

        setConsaltation(data.consaltaionData);
      } else {
        //toast.warning(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handelUpdateConsaltion = async (appointment) => {
    console.log(consaltation);
    setSelectedAppointment(appointment);
    await getConsaltation(appointment._id, appointment.docId);
    setOpenModal(true);
  };

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 text-2xl">
        <p>جاري التحميل</p>
        <Spinner color="purple" aria-label="Purple spinner example" />
      </div>
    );
  }
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
            <div
              onClick={() => navigate(`/appointment/${item.docId}`)}
              className="cursor-pointer"
            >
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
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handelUpdateConsaltion(item)}
                    className="sm:min-w-48 py-2 border border-[#5f6fff] hover:bg-[#5f6fff]  transition-all duration-300 hover:text-white rounded text-[#5f6fff] cursor-pointer"
                  >
                    استشارة
                  </button>
                  <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    {selectedAppointment && (
                      <UpdateConsaltation
                        doctorInfo={selectedAppointment.docData}
                        setOpenModal={setOpenModal}
                        consaltation={consaltation}
                        appointmentId={selectedAppointment._id}
                      />
                    )}
                  </Modal>

                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500 hover:bg-green-500  transition-all duration-300 hover:text-white cursor-pointer">
                    تم الكشف
                  </button>
                </div>
              )}
              {item.payment && (
                <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500 hover:bg-green-500  transition-all duration-300 hover:text-white cursor-pointer">
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
