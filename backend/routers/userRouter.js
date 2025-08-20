import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  listAppointment,
  loginUser,
  registerUser,
  updateProfileUserInfo,
  userProfile,
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

export default userRouter;
