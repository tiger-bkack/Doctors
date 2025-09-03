import PDFDocument from "pdfkit";
import path from "path";

export const generateMedicalReportPDF = (report) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => {
        const result = Buffer.concat(chunks);
        resolve(result);
      });

      // ✅ تسجيل الخط العربي
      const fontPath = path.join(process.cwd(), "fonts", "Amiri-Regular.ttf");
      doc.registerFont("ArabicFont", fontPath);

      // ===================== HEADER =====================
      doc
        .image("public/logo.png", 50, 45, { width: 60 })
        .font("ArabicFont")
        .fontSize(20)
        .fillColor("#2E86C1")
        .text("عيادة سلامتك", 450, 50, { align: "right" });

      doc.moveDown(2);

      // ===================== PATIENT INFO =====================
      doc
        .font("ArabicFont")
        .fontSize(16)
        .fillColor("#000")
        .text("تقرير طبي", { align: "center", underline: true });
      doc.moveDown();

      doc
        .fontSize(12)
        .text(`اسم المريض: ${report.userData.name}`, { align: "right" });
      doc.text(`العمر: ${report.userData.age || "غير محدد"}`, {
        align: "right",
      });
      doc.text(`البريد الإلكتروني: ${report.userData.email}`, {
        align: "right",
      });
      doc.text(
        `  التاريخ: ${new Date(report.createdAt).toLocaleDateString("ar-EG")}`,
        { align: "right" }
      );
      doc.moveDown();

      // ===================== DOCTOR INFO =====================
      doc
        .fontSize(12)
        .fillColor("#2E4053")
        .text(`اسم الطبيب: ${report.docData.name}`, { align: "right" });
      doc.text(`التخصص: ${report.docData.speciality}`, { align: "right" });
      doc.text(
        `العيادة: ${report.docData.address?.line1}, ${report.docData.address?.line2}`,
        { align: "right" }
      );
      doc.moveDown(2);

      // ===================== MEDICAL DETAILS =====================
      doc
        .fillColor("#000")
        .fontSize(14)
        .text("الشكوى:", { underline: true, align: "right" });
      doc
        .fontSize(12)
        .text(report.complaint || "غير متوفر", { align: "right" });
      doc.moveDown();

      doc.fontSize(14).text("الفحص:", { underline: true, align: "right" });
      doc
        .fontSize(12)
        .text(report.examination || "غير متوفر", { align: "right" });
      doc.moveDown();

      doc.fontSize(14).text("التشخيص:", { underline: true, align: "right" });
      doc
        .fontSize(12)
        .text(report.diagnosis || "غير متوفر", { align: "right" });
      doc.moveDown();

      // ===================== TREATMENT TABLE =====================
      if (report.treatment && report.treatment.length > 0) {
        doc.fontSize(14).text("العلاج:", { underline: true, align: "right" });
        doc.moveDown(0.5);

        const tableTop = doc.y;
        const itemX = 50;
        const dosageX = 250;
        const durationX = 400;

        doc
          .fontSize(12)
          .fillColor("#fff")
          .rect(itemX, tableTop, 500, 20)
          .fill("#2E86C1");

        doc
          .fillColor("#fff")
          .text("الدواء", itemX + 5, tableTop + 5)
          .text("الجرعة", dosageX + 5, tableTop + 5)
          .text("المدة", durationX + 5, tableTop + 5);

        let y = tableTop + 25;
        report.treatment.forEach((med) => {
          doc.fillColor("#000");
          doc.text(med.name, itemX + 5, y);
          doc.text(med.dosage || "-", dosageX + 5, y);
          doc.text(med.duration || "-", durationX + 5, y);
          y += 20;
        });
        doc.moveDown(2);
      }

      // ===================== NOTES =====================
      if (report.notes) {
        doc.fontSize(14).text("ملاحظات:", { underline: true, align: "right" });
        doc.fontSize(12).text(report.notes, { align: "right" });
        doc.moveDown();
      }

      // ===================== NEXT VISIT =====================
      if (report.nextVisit) {
        doc
          .fontSize(14)
          .text("موعد الزيارة القادمة:", { underline: true, align: "right" });
        doc
          .fontSize(12)
          .text(new Date(report.nextVisit).toLocaleDateString("ar-EG"), {
            align: "right",
          });
        doc.moveDown();
      }

      // ===================== FOOTER =====================
      doc.moveDown(3);
      doc
        .fontSize(10)
        .fillColor("#555")
        .text("هذا التقرير تم توليده آلياً بواسطة نظام سلامتك", {
          align: "center",
        });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
