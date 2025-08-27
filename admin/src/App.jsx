import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashbord from "./pages/Admin/Dashboard";
import Appointments from "./pages/Admin/Appointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import { Routes, Route } from "react-router-dom";
import { DoctorContext } from "./context/DoctorContext";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorDashbord from "./pages/Doctor/DoctorDashbord";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import { useEffect } from "react";
import { useState } from "react";
import LoaderStartApp from "./components/LoaderStartApp";
import NotFound from "./pages/NotFound";

import Reports from "./pages/Doctor/Reports";
import AllReports from "./pages/Doctor/AllReports";

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoaderStartApp />;
  }

  // الأولوية للدكتور
  if (dtoken) {
    return (
      <div dir="rtl" className="bg-[#f8f9fd]">
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          <Routes>
            {/* Doctor Router */}
            <Route path="/" element={<DoctorDashbord />} />

            <Route path="/doctor-dashbord" element={<DoctorDashbord />} />
            <Route
              path="/doctor-appointments"
              element={<DoctorAppointments />}
            />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            {/* <Route path="/add-report/:appointmentId" element={<Reports />} /> */}
            <Route path="/report" element={<Reports />} />
            <Route path="/reposts" element={<AllReports />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    );
  }

  // لو مفيش dtoken بس فيه atoken → أدمن
  if (atoken) {
    return (
      <div dir="rtl" className="bg-[#f8f9fd]">
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Routes></Routes>

          <Sidebar />
          <Routes>
            {/* Admin Router */}
            <Route path="/" element={<Dashbord />} />
            <Route path="/admin-dashbord" element={<Dashbord />} />
            <Route path="/all-appointment" element={<Appointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
            {/* <Route path="/add-report/:appointmentId" element={<Reports />} /> */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    );
  }

  // لو مفيش ولا دكتور ولا أدمن → Login
  return (
    <div>
      <ToastContainer />
      <Login />
    </div>
  );
};

export default App;
