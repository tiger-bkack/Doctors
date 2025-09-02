import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [atoken, setAtoken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );

  const [doctors, setDoctors] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [dashData, setDashData] = useState(false);

  const [reportData, setReportData] = useState([]);
  const [consultation, setConsultation] = useState([]);
  const [allConsultation, setAllConsultation] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getDoctorList = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/doctor-list", {
        headers: { atoken },
      });

      if (data.success) {
        console.log(data.doctors);
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const changeAvalibilty = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-avalibility",
        { docId },
        {
          headers: { atoken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorList();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAppointment = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/appointment-list",
        { headers: { atoken } }
      );
      if (data.success) {
        console.log(data.appointments);
        setAppointment(data.appointments);
      }
    } catch (error) {
      console.log(error);
      //toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { atoken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointment();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashbord", {
        headers: { atoken },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAllUserReportToAdmin = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/get-report",
        {},
        { headers: { atoken } }
      );

      if (data.success) {
        console.log(data.reports);
        setReportData(data.reports);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deleteReportToAdmin = async (reportId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/get-report",
        { reportId },
        { headers: { atoken } }
      );

      if (data.success) {
        console.log(data.reports);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserReportWithDoctorFromAdmin = async (userId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/user-report",
        { userId },
        { headers: { atoken } }
      );

      if (data.success) {
        console.log(data.userReport);
        setReportData(data.userReport || []);
      } else {
        setReportData([]);
        toast.error(data.success);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserAppointmenttWithDoctorFromAdmin = async (userId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/user-appointment",
        { userId },
        { headers: { atoken } }
      );

      if (data.success) {
        console.log(data.userAppointment);
        setAppointment(data.userAppointment || []);
      } else {
        setReportData([]);
        toast.error(data.success);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserConsultation = async (userId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/user-consultation",
        { userId },
        { headers: { atoken } }
      );

      if (data.success) {
        console.log(data.consultation);
        setConsultation(data.consultation);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelledConsultation = async (consultationId, userId, docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/canceled-consultation",
        { consultationId, userId, docId },
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completedConsultation = async (consultationId, userId, docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/user-completed",
        { consultationId, userId, docId },
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAllConsultation = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-consultation",
        {},
        { headers: { atoken } }
      );
      if (data) {
        console.log(data.consultation);
        setAllConsultation(data.consultation);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const value = {
    atoken,
    setAtoken,
    backendUrl,
    getDoctorList,
    doctors,
    changeAvalibilty,
    getAppointment,
    appointment,
    setAppointment,
    cancelAppointment,
    dashData,
    getDashData,
    cancelledConsultation,
    getAllUserReportToAdmin,
    deleteReportToAdmin,
    setReportData,
    reportData,
    getUserReportWithDoctorFromAdmin,
    getUserAppointmenttWithDoctorFromAdmin,
    getUserConsultation,
    consultation,
    allConsultation,
    completedConsultation,
    getAllConsultation,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
