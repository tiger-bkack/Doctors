import nodemailer from "nodemailer";
import { generateMedicalReportPDF } from "./pdfGenerator.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// sernd Email to user
const sendWelcomEmail = async (toEmail, name) => {
  try {
    await transporter.sendMail({
      from: `سلامتك ${process.env.EMAIL_USER}`,
      to: toEmail,
      subject: "مرحباً بك في سلامتك",
      html: `
      <h2>أهلاً ${name}</h2>
      <p>شكرا للتسجيل معنا من حساب Google  نحن هنا لي مساعدتك و توفير كافة الخدمات الطبية</p>
      <p>نتمني لك تجربة رائعة</p>
      `,
    });
    console.log("تم أرسال الرسالة");
  } catch (error) {
    console.error("هناك خطاء في ارسال الرسالة");
    console.error(error);
  }
};

// send Email to user
const sendAppointmentDetailsToUserEmail = async (
  toEmail,
  name,
  appointmentData,
  docData
) => {
  try {
    await transporter.sendMail({
      from: ` سلامتك <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "تفاصيل حجز موعدك الطبي ✔️",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; background: #f9f9f9; padding: 20px; color: #333;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h2 style="color: #2c7be5; text-align: center;">
              مرحباً ${name} 👋
            </h2>
            <p style="text-align: center;">تم حجز موعدك الطبي بنجاح ✅</p>

            <hr style="margin: 20px 0;" />

            <h3 style="color: #2c7be5;">🩺 تفاصيل الموعد:</h3>
            <p>
              <strong>الطبيب:</strong> ${docData.name}
            </p>
            <p>
              <strong>يوم الحجز:</strong> ${appointmentData.slotDate}
            </p>
            <p>
              <strong>الساعة:</strong> ${appointmentData.slotTime}
            </p>

            <h3 style="color: #2c7be5;">📍 عنوان العيادة:</h3>
            <p>${docData.address.line1}</p>
            <p>${docData.address.line2 || ""}</p>

            <hr style="margin: 20px 0;" />

            <p style="text-align: center; color: #555;">
              لأي استفسارات أو شكاوى، من فضلك تواصل معنا عبر هذا البريد.
              <br />
              نتمنى لك تجربة طبية رائعة وصحة جيدة 🌿
            </p>

            <div style="text-align: center; margin-top: 20px;">
              <img
                src="https://img.icons8.com/color/96/000000/doctor-male.png"
                width="80"
                alt="Doctor"
              />
              <p style="font-size: 14px; color: #999;">فريق سلامتك الطبي</p>
            </div>
          </div>
        </div>
      `,
    });
    console.log("تم أرسال الرسالة");
  } catch (error) {
    console.error("هناك خطاء في ارسال الرسالة");
    console.error(error);
  }
};

const sendConsultationDetailsToUserEmail = async (
  toEmail,
  name,
  docData,
  consultDay,
  consultTime,
  notes
) => {
  try {
    await transporter.sendMail({
      from: ` سلامتك <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "تفاصيل تحديد موعد أستشارة  ✔️",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; background: #f9f9f9; padding: 20px; color: #333;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h2 style="color: #2c7be5; text-align: center;">
              مرحباً ${name} 👋
            </h2>
            <p style="text-align: center;">تم تحديد أستشارة طبية بنجاح ✅</p>

            <hr style="margin: 20px 0;" />

            <h3 style="color: #2c7be5;">🩺 تفاصيل الموعد:</h3>
            <p>
              <strong>الطبيب:</strong> ${docData.name}
            </p>
            <p>
              <strong>يوم الاستشارة:</strong> ${consultDay}
            </p>
            <p>
              <strong>الساعة:</strong> ${consultTime}
            </p>
             <p>
              <strong>ملاحظات الطبيب:</strong> ${notes}
            </p>

            <h3 style="color: #2c7be5;">📍 عنوان العيادة:</h3>
            <p>${docData.address.line1}</p>
            <p>${docData.address.line2 || ""}</p>

            <hr style="margin: 20px 0;" />

            <p style="text-align: center; color: #555;">
              لأي استفسارات أو شكاوى، من فضلك تواصل معنا عبر هذا البريد.
              <br />
              نتمنى لك تجربة طبية رائعة وصحة جيدة 🌿
            </p>

            <div style="text-align: center; margin-top: 20px;">
              <img
                src="https://img.icons8.com/color/96/000000/doctor-male.png"
                width="80"
                alt="Doctor"
              />
              <p style="font-size: 14px; color: #999;">فريق سلامتك الطبي</p>
            </div>
          </div>
        </div>
      `,
    });
    console.log("تم أرسال الرسالة");
  } catch (error) {
    console.error("هناك خطاء في ارسال الرسالة");
    console.error(error);
  }
};

const sendMedicalReportEmail = async (toEmail, report) => {
  try {
    const pdfBuffer = await generateMedicalReportPDF(report);

    await transporter.sendMail({
      from: `  سلامتك <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "تقريرك الطبي - عيادة سلامتك",
      text: "مرفق مع هذه الرسالة تقريرك الطبي بصيغة PDF.",
      attachments: [
        {
          filename: "medical-report.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    console.log("✅ تم إرسال الرسالة مع التقرير");
  } catch (error) {
    console.error("❌ هناك خطأ في ارسال الرسالة");
    console.error(error);
  }
};

export {
  sendWelcomEmail,
  sendAppointmentDetailsToUserEmail,
  sendConsultationDetailsToUserEmail,
  sendMedicalReportEmail,
};
