import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { notification } from "antd";
import { AdminContext } from "./AdminContext";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dtoken, setDtoken] = useState(
    localStorage.getItem("dtoken") ? localStorage.getItem("dtoken") : ""
  );

  // const [api, contextHolderDoctor] = notification.useNotification();

  // const openNotificationWithIcon = (type, message) => {
  //   api[type]({
  //     message: message,
  //   });
  // };

  const { openNotificationWithIcon } = useContext(AdminContext);
  const [loader, setLoader] = useState(false);
  const [getAppointmentLoader, setGetAppointmentLoader] = useState(false);

  const [appointment, setAppointment] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [docInfo, setDocInfo] = useState(false);
  const [userData, setUserData] = useState(false);

  const [reportData, setReportData] = useState([]);

  const [consultation, setConsultation] = useState([]);

  const getAppointments = async () => {
    try {
      setGetAppointmentLoader(true);
      const { data } = await axios.post(
        backendUrl + "/api/doctor/appointments",
        {},
        { headers: { dtoken } }
      );

      if (data.success) {
        setAppointment(data.appointments);
        //console.log(data.appointments);
      } else {
        //toast.error(data.message);
        openNotificationWithIcon("error", data.message);
      }
    } catch (error) {
      console.log(error);
      //toast.error(error.message);
      openNotificationWithIcon("error", error.message);
    } finally {
      setGetAppointmentLoader(false);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      setLoader(true);
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { dtoken } }
      );

      if (data.success) {
        toast.success(data.message);
        openNotificationWithIcon("success", data.message);

        getAppointments();
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", error.message);

      // toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      setLoader(true);

      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dtoken } }
      );

      if (data.success) {
        //toast.success(data.message);
        openNotificationWithIcon("success", data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", error.message);

      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  const getDoctorDashbord = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/dashpord",
        {},
        {
          headers: { dtoken },
        }
      );
      if (data.success) {
        setDashData(data.dashData);
        //console.log(data.dashData);
      } else {
        openNotificationWithIcon("success", data.message);
        //toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", error.message);

      //toast.error(error.message);
    }
  };

  const getDoctorProfile = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/profile",
        {},
        { headers: { dtoken } }
      );

      if (data.success) {
        //console.log(data.docInfo);
        setDocInfo(data.docInfo);
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", error.message);

      //toast.error(error.message);
    }
  };

  const deletedSlotsBooked = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/delete-slots",
        {},
        { headers: { dtoken } }
      );
      if (data.success) {
        openNotificationWithIcon("success", data.message);
        //toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", error.message);

      // toast.error(error.message);
    }
  };

  const getAllReport = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/reposts",
        {},
        { headers: { dtoken } }
      );
      if (data.success) {
        //console.log(data.reports);
        setReportData(data.reports);
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", error.message);

      //toast.error(error.message);
    }
  };

  const getUserReportWithDoctor = async (userId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/user-report",
        { userId },
        { headers: { dtoken } }
      );

      if (data.success) {
        //console.log(data.userReport);
        setReportData(data.userReport || []);
      } else {
        setReportData([]);
        //toast.error(data.success);
        openNotificationWithIcon("error", data.message);
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", error.message);
      //toast.error(error.message);
    }
  };

  const getUserInfo = async (userId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/user-info",
        { userId },
        { headers: { dtoken } }
      );
      if (data.success) {
        setUserData(data.userDetails);
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", error.message);

      //toast.error(error.message);
    }
  };

  const completeConsultation = async (consultationId, userId) => {
    try {
      console.log(consultationId);
      console.log(userId);

      setLoader(true);
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-consultation",
        { consultationId, userId },
        { headers: { dtoken } }
      );

      if (data.success) {
        // toast.success(data.message);
        openNotificationWithIcon("success", data.message);
      } else {
        // toast.error(data.message);
        openNotificationWithIcon("error", data.message);
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", error.message);

      // toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  const cancelConsultation = async (consultationId, userId) => {
    try {
      setLoader(true);
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-consultation",
        { consultationId, userId },
        { headers: { dtoken } }
      );

      if (data.success) {
        //toast.success(data.message);
        openNotificationWithIcon("success", data.message);
      } else {
        //toast.error(data.message);
        openNotificationWithIcon("error", data.message);
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", error.message);

      //toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  const getConsultation = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/consultation",
        {},
        { headers: { dtoken } }
      );

      if (data.success) {
        // console.log(data.consualtations);
        setConsultation(data.consualtations);
      } else {
        // console.log(data.message);
        // toast.error(data.message);
        openNotificationWithIcon("error", data.message);
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", error.message);

      // toast.error(error.message);
    }
  };

  const deletedReport = async (reportId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/delete-report",
        { reportId },
        { headers: { dtoken } }
      );

      if (data.success) {
        toast.success(data.message);
        openNotificationWithIcon("success", data.message);
      } else {
        toast.error(data.message);
        openNotificationWithIcon("error", data.message);
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", error.message);

      //toast.error(error.message);
    }
  };

  const value = {
    dtoken,
    setDtoken,
    backendUrl,
    getAppointments,
    appointment,
    cancelAppointment,
    completeAppointment,
    loader,
    getAppointmentLoader,
    getDoctorDashbord,
    dashData,
    setDashData,
    getDoctorProfile,
    docInfo,
    setDocInfo,
    getAllReport,
    reportData,
    setReportData,
    getUserReportWithDoctor,
    getUserInfo,
    userData,
    completeConsultation,
    cancelConsultation,
    getConsultation,
    consultation,
    deletedSlotsBooked,
    deletedReport,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
