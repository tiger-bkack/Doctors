import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

import { notification } from "antd";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [atoken, setAtoken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, title = "", message) => {
    api[type]({
      message: title,
      description: message,
    });
  };

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
        //console.log(data.doctors);
        setDoctors(data.doctors);
      } else {
        //toast.error(data.message);
        openNotificationWithIcon("error", "بيانات الطباء", data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeDoctor = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/delete-doctor",
        { docId },
        { headers: { atoken } }
      );

      if (data.success) {
        //toast.success(data.message);
        openNotificationWithIcon("success", "حذف الطبيب", data.message);
        getDoctorList();
      } else {
        //toast.error(data.message);
        openNotificationWithIcon("error", "حذف الطبيب", data.message);
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
        //toast.success(data.message);
        openNotificationWithIcon("success", "تحديث حالة الطبيب", data.message);

        getDoctorList();
      } else {
        toast.error(data.message);
        openNotificationWithIcon("error", "تحديث حالة الطبيب", data.message);
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
        //toast.success(data.message);
        openNotificationWithIcon(
          "success",
          "ألغاء الحجز من قبل الادمن",
          data.message
        );

        getAppointment();
      }
      // else {
      //   openNotificationWithIcon(
      //     "error",
      //     "ألغاء الحجز من قبل الادمن",
      //     data.message
      //   );
      // }
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
        //console.log(data.dashData);
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
        //console.log(data.reports);
        setReportData(data.reports);
      }
    } catch (error) {
      console.log(error);
      getAllUserReportToAdmin(
        "error",
        "جلب كل تقارير النستخدم لي الادمن",
        error.message
      );
      toast.error(error.message);
    }
  };

  const deleteReportToAdmin = async (reportId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/delete-report",
        { reportId },
        { headers: { atoken } }
      );

      if (data.success) {
        //console.log(data.reports);
        getAllUserReportToAdmin();
        openNotificationWithIcon(
          "success",
          "حذف التقرير للمريض من قبل الأدمن",
          data.message
        );
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
        // console.log(data.userReport);
        setReportData(data.userReport || []);
        getAllUserReportToAdmin();
      } else {
        setReportData([]);
        //toast.error(data.success);
        openNotificationWithIcon(
          "error",
          "كل تقارير المارض لي كل الاطباء",
          data.message
        );
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
        //console.log(data.userAppointment);
        setAppointment(data.userAppointment || []);
        getAppointment();
      } else {
        setReportData([]);
        toast.error(data.success);
        openNotificationWithIcon(
          "error",
          "كل الحجزات الخاصة بالمريض مع كل الاطباء",
          data.message
        );
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
        //console.log(data.consultation);
        setAllConsultation(data.consultation);
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
        // console.log(data.consultation);
        setConsultation(data.consultation);
        getAllConsultation();
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
        //toast.success(data.message);
        getAllConsultation();
        openNotificationWithIcon(
          "success",
          "ألغاء الأستشارة من قبل الادمن",
          data.message
        );
      } else {
        //toast.error(data.message);
        openNotificationWithIcon(
          "error",
          "ألغاء الأستشارة من قبل الادمن",
          data.message
        );
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
        //toast.success(data.message);
        getAllConsultation();
        openNotificationWithIcon(
          "success",
          "أكمال الأستشارة من قبل الادمن",
          data.message
        );
      } else {
        //toast.error(data.message);
        openNotificationWithIcon(
          "error",
          "أكمال الأستشارة من قبل الادمن",
          data.message
        );
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
    removeDoctor,
    contextHolder,
    openNotificationWithIcon,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
