import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import { assets } from "../assets/assets";
import RelatedDoctor from "../components/RelatedDoctor";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, curremcysymbol, token, backendUrl, getDoctorList } =
    useContext(AppContext);
  const dayOfWeek = [
    "الأحد",
    "الأثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  const [doctorInfo, setDectorInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotsIndex, SetSlotsIndex] = useState(0);
  const [slotsTime, setSlotsTime] = useState("");

  const fatchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);

    setDectorInfo(docInfo);
    console.log(docInfo);
  };

  const getAvalidablSlats = () => {
    if (!doctorInfo || !doctorInfo.start_booked) return;

    setDocSlots([]);

    const { from, to, booking_period } = doctorInfo.start_booked;

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let startTime = new Date(currentDate);
      startTime.setHours(from, 0, 0, 0);

      let endTime = new Date(currentDate);
      endTime.setHours(to, 0, 0, 0);

      // لو النهاردة → ابدأ من الساعة الحالية على الأقل
      if (i === 0) {
        const now = new Date();
        if (now > startTime) startTime = new Date(now.getTime() + 60 * 1000); // بعد دقيقة
      }

      let timeSlote = [];
      let loopTime = new Date(startTime);

      while (loopTime < endTime) {
        let formatedTime = loopTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = loopTime.getDate();
        let month = loopTime.getMonth() + 1;
        let year = loopTime.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formatedTime;

        // لو مش محجوز بالفعل
        const isSlotAvailable = doctorInfo.slots_booked?.[slotDate]?.includes(
          slotTime
        )
          ? false
          : true;

        if (isSlotAvailable) {
          timeSlote.push({
            dateTime: new Date(loopTime),
            time: formatedTime,
          });
        }

        // زود مدة الكشف
        loopTime.setMinutes(loopTime.getMinutes() + booking_period);
      }

      setDocSlots((prev) => [...prev, timeSlote]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login first to Appointment");
      return navigate("/login");
    }
    try {
      const date = docSlots[slotsIndex][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      //console.log(slotDate);

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        {
          docId,
          slotDate,
          slotTime: slotsTime,
        },
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorList();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // تحويل من 24 ساعة إلى 12 ساعة مع AM/PM
  function to12HourFormat(hour) {
    // لو جالك نص حوّله رقم
    hour = Number(hour);

    // حساب AM أو PM
    let period = hour >= 12 ? "بالليل" : "الصبح";

    // لو الساعة أكبر من 12 رجّعها لصيغة 12
    let adjustedHour = hour % 12;

    // الساعة 0 يعني 12 (زي 00:00 = 12 AM)
    adjustedHour = adjustedHour === 0 ? 12 : adjustedHour;

    return `${adjustedHour} ${period}`;
  }

  //console.log(doctorInfo);
  useEffect(() => {
    fatchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvalidablSlats();
  }, [doctorInfo]);

  useEffect(() => {
    //console.log(docSlots);
  }, [docSlots]);

  return (
    doctorInfo && (
      <div dir="rtl">
        {/* Doctors Detals */}
        <div className="flex flex-col sm:flex-row gap-4">
          <section>
            <img
              className={`w-full sm:max-w-72 rounded-lg ${
                doctorInfo.avalibale
                  ? "bg-[#5f6fff] transition-all duration-500"
                  : "bg-gray-500 transition-all duration-500"
              }`}
              src={doctorInfo.image}
              alt=""
            />
          </section>
          <section className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/*---------Doc info : name , degree , expreience ----------*/}

            <p className="flex items-center text-2xl font-medium gap-2 text-gray-900">
              {doctorInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {doctorInfo.speciality} - {doctorInfo.degree}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {doctorInfo.experince}
              </button>
            </div>

            <div className="flex flex-col text-sm  text-gary-500 mt-2 font-medium ">
              <p className="text-gray-600">رقم الهاتف : {doctorInfo.phone}</p>
              <p className="text-gray-600">
                مواعيد العمل من الساعه{" "}
                {to12HourFormat(doctorInfo.start_booked.from)} إلي{" "}
                {to12HourFormat(doctorInfo.start_booked.to)}
              </p>
            </div>

            {/* --------Doc about ---------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                <img className="cursor-pointer" src={assets.info_icon} alt="" />{" "}
                About
              </p>
              <p className="text-sm text-garay-500 max-w-[700px] mt-1">
                {doctorInfo.about}
              </p>
            </div>
            <p className="text-gary-500 mt-4 font-medium">
              تكاليف الكشف:{"  "}
              <span className="text-gray-600">
                {doctorInfo.fees} {curremcysymbol}
              </span>
            </p>
          </section>
        </div>

        {/*----------BOOKIN SOLTE--------------- */}
        <div className="sm:mr-72 sm:pr-4 mt-4 font-medium text-gray-700">
          <p>أختر الموعد المناسب</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => SetSlotsIndex(index)}
                  key={index}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotsIndex === index
                      ? "bg-[#5f6fff] text-white transition-all duration-150"
                      : "border border-gray-200"
                  }`}
                >
                  <p>{item[0] && dayOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[slotsIndex].map((item, index) => (
                <p
                  onClick={() => setSlotsTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotsTime
                      ? "bg-[#5f6fff] text-white transition-all duration-150"
                      : "text-gray-400 border border-gray-300"
                  } `}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-[#5f6fff] text-sm cursor-pointer text-white font-light px-14 py-3 rounded-full my-6 hover:bg-[#5f6fffc4] transition-all duration-200"
          >
            حفظ الموعد
          </button>
        </div>

        {/* lists related doctor */}
        <RelatedDoctor docId={docId} speciality={doctorInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
