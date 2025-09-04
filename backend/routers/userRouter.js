import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  cancelConsultation,
  getAllConsaltation,
  getConsaltation,
  googleLogin,
  listAppointment,
  loginUser,
  registerUser,
  updateConsaltationTime,
  updateProfileUserInfo,
  useDetails,
  userProfile,
  userReports,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";
import { authlimiter, normalLimiter } from "../middlewares/rateLimiting.js";

const userRouter = express.Router();

userRouter.post("/register", authlimiter, registerUser);

userRouter.post("/login", authlimiter, loginUser);

userRouter.post("/google", authlimiter, googleLogin);

userRouter.get("/get-profile", normalLimiter, authUser, userProfile);

userRouter.post(
  "/update-ptofile",
  normalLimiter,
  upload.single("image"),
  authUser,
  updateProfileUserInfo
);

userRouter.get("/list-appointment", normalLimiter, authUser, listAppointment);

userRouter.post("/book-appointment", normalLimiter, authUser, bookAppointment);

userRouter.post(
  "/cancel-appointment",
  normalLimiter,
  authUser,
  cancelAppointment
);

userRouter.post("/reports", normalLimiter, authUser, userReports);

userRouter.post("/user-info", normalLimiter, authUser, useDetails);

userRouter.post("/consaltation", normalLimiter, authUser, getConsaltation);

userRouter.post(
  "/all-consaltation",
  normalLimiter,
  authUser,
  getAllConsaltation
);

userRouter.post(
  "/update-ConsaltationTime",
  normalLimiter,
  authUser,
  updateConsaltationTime
);

userRouter.post(
  "/cancel-consultation",
  normalLimiter,
  authUser,
  cancelConsultation
);

export default userRouter;
