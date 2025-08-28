import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Stripe from "stripe";
import reportModel from "../models/reportModel.js";
import consultationModel from "../models/consultationModel.js";

// user login
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return req.json({
        success: false,
        message: "هناك بعض البيانات المفقودة",
      });
    }
    if (!validator.isEmail(email)) {
      return req.json({
        success: false,
        message: "من فضلك أدخل بريدألكتروني صالح",
      });
    }
    // adding stroning password
    if (password.length < 8) {
      return req.json({
        success: true,
        message: "من فضلك أدخل كلمة سر قويه",
      });
    }
    // hashing password to save in data base
    const slot = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, slot);

    const userData = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    // create web token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api lo login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "هناك خطاء قي البريد الالكتروني أو كلمة السر",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "هناك خطاء قي البريد الالكتروني أو كلمة السر",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get user info
const userProfile = async (req, res) => {
  try {
    const userId = req.body?.userId || req.userId;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProfileUserInfo = async (req, res) => {
  try {
    const {
      userId,
      name,
      phone,
      address,
      gender,
      dob,
      nationality,
      nationaliId,
    } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !gender || !dob || !nationality || !nationaliId) {
      return res.json({
        success: false,
        message: "هناك بعض البيانات المفقودة",
      });
    }

    // التحقق من طول الرقم القومي
    if (nationaliId.length !== 14) {
      return res.json({
        success: false,
        message: "ادخل رقم قومي صحيح مكون من 14 رقم",
      });
    }

    // التحقق من وجود الرقم القومي عند مستخدم آخر
    const existingUser = await userModel.findOne({ nationaliId });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.json({
        success: false,
        message: "هذا الرقم القومي مستخدم بالفعل",
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
      nationality,
      nationaliId,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "تم تحديث الحساب الشخصي بنجاح" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-passwoed");

    if (!docData.avalibale) {
      return res.json({
        success: false,
        message: "هذا الطبيب ليس متاح في الوقت الحالي",
      });
    }

    let slots_booked = docData.slots_booked;

    // check for slot is availablity
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "هذا الوقت ليس متاح ",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // save new slot in doctor data (docData)
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "تم حجز الموعد بنجاح" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get all appointment list for user
const listAppointment = async (req, res) => {
  try {
    const userId = req.body?.userId || req.userId;

    const appointments = await appointmentModel.find({ userId });

    if (!appointments) {
      return res.json({
        success: false,
        message: "ليس لديك حجزات بعد",
      });
    }

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    //const userId = req.body?.userId || req.userId;
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.json({ success: true, message: "غير مصرك لك" });
    }

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

// get all reports
const userReports = async (req, res) => {
  try {
    const userId = req.userId;
    const reports = await reportModel.find({ userId });

    if (!reports || reports.length === 0) {
      return res.json({ success: true, message: "لا يوجد اي تقارير حتي الان" });
    }

    return res.json({ success: true, reports });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// get how many appointment for this use and report
const useDetails = async (req, res) => {
  try {
    const userId = req.userId;

    const userAppointment = await appointmentModel.find({ userId });
    const userReport = await reportModel.find({ userId });
    const userConsultation = await consultationModel.find({ userId });

    const userDetails = {
      userAppointment: userAppointment.length,
      userReport: userReport.length,
      userConsultation: userConsultation.length,
    };

    res.json({ success: true, userDetails });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get consultation to user
const getConsaltation = async (req, res) => {
  try {
    const { appointmentId, docId } = req.body;
    const userId = req.userId;

    const consaltaionData = await consultationModel.findOne({
      appointmentId,
      docId,
      userId,
    });

    if (!consaltaionData) {
      return res.json({
        success: false,
        message: "لم يقوم الطبيب بتحديد موعد أستشارة",
      });
    }

    res.json({ success: true, consaltaionData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get all consultation to user
const getAllConsaltation = async (req, res) => {
  try {
    const userId = req.userId;
    const consaltationData = await consultationModel.find({ userId: userId });

    if (!consaltationData) {
      return res.json({
        success: false,
        message: "you don't have consultation yet",
      });
    }

    res.json({ success: true, consaltationData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// تحديث وقت الاستشارة مع التحقق من التكرار
const updateConsaltationTime = async (req, res) => {
  try {
    const { consaltationId, consultTime } = req.body;

    // جلب الاستشارة الحالية
    const consaltation = await consultationModel.findById(consaltationId);
    if (!consaltation) {
      return res.json({
        success: false,
        message: "لا توجد استشارة بهذا المعرف",
      });
    }

    const consultDay = consaltation.consultDay; // اليوم موجود في الاستشارة بالفعل
    const selectedTime = consultTime;

    // تحقق لو فيه أي استشارة بنفس اليوم والوقت سواء لنفس المستخدم أو لحد تاني
    const conflict = await consultationModel.findOne({
      consultDay,
      consultTime: selectedTime,
    });

    if (conflict) {
      return res.json({
        success: false,
        message: "هذا الوقت تم حجزه بالفعل، اختر وقت آخر",
      });
    }

    // تحديث الاستشارة
    consaltation.consultTime = selectedTime;
    await consaltation.save();

    res.json({
      success: true,
      message: "تم تحديث وقت الاستشارة بنجاح",
      consaltation,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const cancelledConsultation = async (req, res) => {
  try {
    const { consultationId, docId } = req.body;
    const userId = req.userId;

    //هشيل الوقت من علشان يبقي ظاهر للمستخدمين التنيين
  } catch (error) {}
};

export {
  registerUser,
  loginUser,
  userProfile,
  updateProfileUserInfo,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  userReports,
  useDetails,
  getConsaltation,
  updateConsaltationTime,
  getAllConsaltation,
};
