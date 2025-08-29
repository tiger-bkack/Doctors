import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  cancelConsultation,
  getAllConsaltation,
  getConsaltation,
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

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, userProfile);

userRouter.post(
  "/update-ptofile",
  upload.single("image"),
  authUser,
  updateProfileUserInfo
);

userRouter.get("/list-appointment", authUser, listAppointment);

userRouter.post("/book-appointment", authUser, bookAppointment);

userRouter.post("/cancel-appointment", authUser, cancelAppointment);

userRouter.post("/reports", authUser, userReports);

userRouter.post("/user-info", authUser, useDetails);

userRouter.post("/consaltation", authUser, getConsaltation);

userRouter.post("/all-consaltation", authUser, getAllConsaltation);

userRouter.post("/update-ConsaltationTime", authUser, updateConsaltationTime);

userRouter.post("/cancel-consultation", authUser, cancelConsultation);

export default userRouter;
