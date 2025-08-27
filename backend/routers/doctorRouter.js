import express from "express";
import {
  doctorAppointments,
  doctorList,
  loginDoctor,
  appointmentCompleted,
  appointmentCancel,
  doctorDashbord,
  doctorProfile,
  doctorProfileUpdate,
  addReport,
  allReport,
  getUserReportWithDoctor,
  searchUser,
  editReport,
  useDetails,
  createConsaltation,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);

doctorRouter.post("/login", loginDoctor);

doctorRouter.post("/appointments", authDoctor, doctorAppointments);

doctorRouter.post("/complete-appointment", authDoctor, appointmentCompleted);

doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);

doctorRouter.post("/dashpord", authDoctor, doctorDashbord);

doctorRouter.post("/profile", authDoctor, doctorProfile);

doctorRouter.post("/update-profile", authDoctor, doctorProfileUpdate);

doctorRouter.post("/add-report", authDoctor, addReport);

doctorRouter.post("/update-report", authDoctor, editReport);

doctorRouter.post("/reposts", authDoctor, allReport);

doctorRouter.post("/user-report", authDoctor, getUserReportWithDoctor);

doctorRouter.post("/search", authDoctor, searchUser);

doctorRouter.post("/user-info", authDoctor, useDetails);

doctorRouter.post("/add-consualtation", authDoctor, createConsaltation);
export default doctorRouter;
