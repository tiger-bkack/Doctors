import { createContext, useEffect, useState } from "react";
//import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const curremcysymbol = "جنية";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [userData, setUserData] = useState(false);
  const [loader, setLoader] = useState(false);
  const [reports, setReports] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const calculateAge = (dob) => {
    const today = new Date();
    const birDate = new Date(dob);

    let age = today.getFullYear() - birDate.getFullYear();
    return age;
  };
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
    const dateArray = slotDate.split("-");
    return (
      dateArray[0] + " " + month[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const to12HourFormat = (hour) => {
    hour = Number(hour);
    let period = hour >= 12 ? "بالليل" : "الصبح";
    let adjustedHour = hour % 12;
    adjustedHour = adjustedHour === 0 ? 12 : adjustedHour;
    return `${adjustedHour} ${period}`;
  };

  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  }
  const getDoctorList = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAllReportsFromUser = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/reports",
        {},
        { headers: { token } }
      );

      if (data.success) {
        console.log(data.reports);
        setReports(data.reports || []);
      } else {
        setReports([]);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserInfo = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/user-info",
        {},
        { headers: { token } }
      );
      if (data.success) {
        setUserInfo(data.userDetails);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);
  const value = {
    slotDateFormat,
    calculateAge,
    doctors,
    curremcysymbol,
    backendUrl,
    getDoctorList,
    setToken,
    token,
    userData,
    setUserData,
    loadUserProfileData,
    loader,
    getAllReportsFromUser,
    reports,
    getUserInfo,
    userInfo,
    to12HourFormat,
    formatDate,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
