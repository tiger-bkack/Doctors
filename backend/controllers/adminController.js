import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import consultationModel from "../models/consultationModel.js";
import reportModel from "../models/reportModel.js";

//API for adding a doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experince,
      about,
      fees,
      address,
      phone,
      start_booked,
    } = req.body;

    const imageFile = req.file;

    // check for all data to a doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experince ||
      !about ||
      !fees ||
      !address ||
      !phone ||
      !start_booked
    ) {
      return res.json({ success: false, message: "هنام بعض الحقول مفقودة" });
    }

    // check emali validation format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "من فضلك أدخل بريدألكتروني صالح",
      });
    }

    // adding stroning password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "من فضلك أدخل كله سر  أكبر من 8  أحرف ",
      });
    }
    // hashing password to save in data base
    const slot = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, slot);

    // adding phone number
    if (password.length > 11) {
      return res.json({
        success: false,
        message: "من فضلك أدخل رقم هاتف بطريقه صحيحة",
      });
    }

    // upload image in cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // adding doctor in data base and save it

    const doctorData = {
      name,
      email,
      password: hashPassword,
      image: imageUrl,
      speciality,
      degree,
      experince,
      about,
      fees,
      phone,
      start_booked: JSON.parse(start_booked),
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.json({ success: true, message: "تم أضاف الطبي بنجاح" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//get all doctor for admin list -----> dashbord

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: fales, message: error.message });
  }
};

const getAllAppointment = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: fales, message: error.message });
  }
};
// API for cancel appointment from admin dashbord
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // releasing doctor slot

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "تم ألغاء الحجز بنجاح" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get dashbord data to doctors & users & appointments
const adminDashbord = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});
    const consultations = await consultationModel.find({});
    const reporsts = await reportModel.find({});

    const dashData = {
      doctors: doctors.length,
      users: users.length,
      appointments: appointments.length,
      consultations: consultations.length,
      reporsts: reporsts.length,
      lastAppointment: appointments.reverse().slice(0, 5),
      lastConsultation: consultations.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const cancelConsultation = async (req, res) => {
  try {
    const { consultationId, userId, docId } = req.body;

    const consultation = await consultationModel.findById(consultationId);
    if (
      consultation &&
      consultation.docId.equals(docId) &&
      consultation.userId.equals(userId)
    ) {
      await consultationModel.findByIdAndUpdate(consultationId, {
        cancelled: true,
      });
      res.json({
        success: true,
        message: `تم ألغاء 
        استشارة الماريض ${consultation.userData.name}`,
      });
    } else {
      res.json({ success: false, message: "لم تنجح العملية" });
    }

    // releasing doctor slot

    const { consultDay, consultTime } = consultation;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[consultDay] = slots_booked[consultDay].filter(
      (e) => e !== consultTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to remove doctors from admin dashbord
const removeDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    await doctorModel.findByIdAndDelete(docId);

    // const { docId } = req.body;
    // const doctorId = await doctorModel.findById(docId);
    // if (doctorId && doctorId.docId === docId) {
    //   await doctorModel.findByIdAndDelete(docId);
    //   res.json({ success: true, message: "Doctor deleted successfully " });
    // } else {
    //   res.json({ success: false, message: "someting wrong" });
    // }
  } catch (error) {
    console.log(error);
    res.json({ success: fales, message: error.message });
  }
};

export {
  addDoctor,
  loginAdmin,
  doctorList,
  getAllAppointment,
  cancelAppointment,
  adminDashbord,
  removeDoctor,
  cancelConsultation,
};
