import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import appointmentModel from "../models/appointmentModel.js";
import reportModel from "../models/reportModel.js";
import userModel from "../models/userModel.js";

const changeAvalibality = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docData, {
      avalibale: !docData.avalibale,
    });
    res.json({ success: true, message: "تم تحديث الحاله بنجاح" });
  } catch (error) {
    console.log(error);
    res.json({ success: fales, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: fales, message: error.message });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      res.json({
        success: false,
        message: "ربما البريد الاكلتروني أو كلة السر خطاء",
      });
    }
    const comparPassword = await bcrypt.compare(password, doctor.password);

    if (comparPassword) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "ربما البريد الاكلتروني أو كلة السر خطاء",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorAppointments = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentCompleted = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      res.json({ success: true, message: "تم الانتهاء من الكشق بنجاح" });
    } else {
      res.json({ success: false, message: "لم تنجح العملية" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      res.json({
        success: true,
        message: `تم الكشف من قبل الطبيب ${appointmentData.docData.name}`,
      });
    } else {
      res.json({ success: false, message: "لم تنجح العملية" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// doctor api ------> dashbord
const doctorDashbord = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    const patients = [];
    appointments.map((items) => {
      if (!patients.includes(items.userId)) {
        patients.push(items.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get doctor info to -------> dashbord
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const docInfo = await doctorModel.findById(docId).select("-password");

    res.json({ success: true, docInfo });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to update doctor info to -------> dashbord
const doctorProfileUpdate = async (req, res) => {
  try {
    const { docId, fees, address, avalibale, phone, start_booked } = req.body;
    const docInfo = await doctorModel.findByIdAndUpdate(docId, {
      fees,
      address,
      avalibale,
      phone,
      start_booked,
    });

    res.json({
      success: true,
      message: ` تم تحديث الحساب الشخصي لي   ${docInfo.name}`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to add report to user from dashbord
const addReport = async (req, res) => {
  try {
    const {
      appointmentId,
      complaint,
      examination,
      diagnosis,
      treatment,
      notes,
      nextVisit,
    } = req.body;

    if (!complaint || !examination || !diagnosis || !treatment) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (!appointment.isCompleted || appointment.cancelled) {
      return res.status(400).json({
        success: false,
        message: "لايمكن كتابة تقرير لمريض ألغى الكشف أو لم يكمل الكشف",
      });
    }

    const todayVisit = new Date(appointment.slotDate);
    const newNextVisit = new Date(nextVisit);

    if (newNextVisit <= todayVisit) {
      return res.status(400).json({
        success: false,
        message: "لا يجوز اختيار موعد قبل يوم الكشف أو في نفس اليوم",
      });
    }

    const reportData = {
      complaint,
      examination,
      diagnosis,
      treatment: Array.isArray(treatment) ? treatment : JSON.parse(treatment),
      notes,
      nextVisit,
      userId: appointment.userId,
      docId: appointment.docId,
      userData: appointment.userData,
      docData: appointment.docData,
      appointmentData: appointment,
      appointmentId,
    };

    const newReport = new reportModel(reportData);
    await newReport.save();

    res.status(201).json({
      success: true,
      message: "Report added successfully",
      report: newReport,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api get all report to doctor dashbord
const allReport = async (req, res) => {
  try {
    const reports = await reportModel.find({});
    res.json({ success: true, reports });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// api to get user reports from the doctor
const getUserReportWithDoctor = async (req, res) => {
  try {
    const { userId } = req.body;
    const docId = req.docId;
    const userReport = await reportModel.find({ userId, docId });

    if (!userReport || userReport.length === 0) {
      return res.json({ success: false, message: "لا يوجد تقارير" });
    }
    res.status(200).json({ success: true, userReport });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//api to search about user from doctor dachbord

const searchUser = async (req, res) => {
  try {
    const { q } = req.body;
    const docId = req.docId; // middleware

    if (!q || !docId) {
      return res
        .status(400)
        .json({ success: false, message: "query and doctor required" });
    }

    const appointments = await appointmentModel
      .find({
        docId,
        $or: [
          { "userData.name": { $regex: q, $options: "i" } },
          { "userData.nationalId": { $regex: q, $options: "i" } },
          { "userData.phone": { $regex: q.replace(/\s/g, ""), $options: "i" } },
        ],
      })
      .limit(10);

    const users = appointments.map((a) => a.userData);
    const uniqueUsers = Array.from(
      new Map(users.map((u) => [u._id || u.id || u.phone, u])).values()
    );

    res.json({ success: true, users: uniqueUsers });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
export {
  changeAvalibality,
  doctorList,
  loginDoctor,
  doctorAppointments,
  appointmentCompleted,
  appointmentCancel,
  doctorDashbord,
  doctorProfile,
  doctorProfileUpdate,
  addReport,
  allReport,
  getUserReportWithDoctor,
  searchUser,
};
