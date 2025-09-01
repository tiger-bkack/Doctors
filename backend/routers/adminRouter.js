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
adminRouter.delete("/delete-doctor", authAdmin, removeDoctor);
adminRouter.delete("/canceled-consultation", authAdmin, cancelConsultation);

export default adminRouter;
