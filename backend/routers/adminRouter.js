import express from "express";
import {
  addDoctor,
  loginAdmin,
  doctorList,
  getAllAppointment,
  cancelAppointment,
  adminDashbord,
  removeDoctor,
  cancelConsultation,
  getUserReportToAdmin,
  deletedReportFromAdmin,
  editReportFromAdmin,
  searchUserFromAdmin,
  getUserReportWithDoctorFromAdmin,
  getUseruserAppointmentWithDoctorFromAdmin,
  getAllUserConsultationToAdmin,
  completedConsultation,
  getAllConsultationToAdmin,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";

import authAdmin from "../middlewares/authAdmin.js";
import { changeAvalibality } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);

adminRouter.post("/login", loginAdmin);

adminRouter.get("/doctor-list", authAdmin, doctorList);

adminRouter.post("/change-avalibility", authAdmin, changeAvalibality);

adminRouter.get("/appointment-list", authAdmin, getAllAppointment);

adminRouter.post("/cancel-appointment", authAdmin, cancelAppointment);

adminRouter.get("/dashbord", authAdmin, adminDashbord);

adminRouter.post("/delete-doctor", authAdmin, removeDoctor);

adminRouter.post("/canceled-consultation", authAdmin, cancelConsultation);

adminRouter.post("/get-report", authAdmin, getUserReportToAdmin);

adminRouter.post("/delete-report", authAdmin, deletedReportFromAdmin);

adminRouter.post("/edit-report", authAdmin, editReportFromAdmin);

adminRouter.post("/search", authAdmin, searchUserFromAdmin);

adminRouter.post("/user-report", authAdmin, getUserReportWithDoctorFromAdmin);

adminRouter.post(
  "/user-appointment",
  authAdmin,
  getUseruserAppointmentWithDoctorFromAdmin
);

adminRouter.post(
  "/user-consultation",
  authAdmin,
  getAllUserConsultationToAdmin
);

adminRouter.post("/user-completed", authAdmin, completedConsultation);

adminRouter.post("/all-consultation", authAdmin, getAllConsultationToAdmin);

export default adminRouter;
