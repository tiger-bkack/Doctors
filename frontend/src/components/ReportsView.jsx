import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { AppContext } from "../context/AppContext";
import { Button } from "flowbite-react";

function ReportsView({ reports }) {
  const { slotDateFormat, calculateAge } = useContext(AppContext);

  const reportRefs = useRef([]);

  const handlePrint = async (element) => {
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const image = pdf.getImageProperties(data);
    const pdfWidht = pdf.internal.pageSize.getWidth();
    const pdfHeight = (image.height * pdfWidht) / image.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidht, pdfHeight);
    pdf.save("report.pdf");
  };
  return (
    <div dir="ltr">
      <div className=" max-h-[85vh] min-h-[80vh] overflow-y-scroll rounded-2xl w-full">
        {reports.map((report, index) => (
          <div
            ref={(el) => (reportRefs.current[index] = el)}
            key={index}
            className="p-15 mt-10 shadow-lg bg-white mx-auto my-8"
            style={{
              width: "210mm",
              minHeight: "297mm",
              padding: "20mm",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Header */}
            <div>
              <div className="text-center mb-4 border-b pb-5">
                <div className="flex items-center justify-center gap-2">
                  <img className="w-20" src={assets.logo} alt="logo" />
                  <div>
                    <p className="text-3xl font-bold">سلامـتك</p>
                    <p className="text-sm text-gray-500">راحة . طمأنينة</p>
                  </div>
                </div>
                <h2 className="text-lg font-semibold mt-2">
                  مجمع الخدمات الطبية
                </h2>
                <h3 className="text-base">Medical Report</h3>
              </div>

              {/* Report body */}
              <div className="report-body ">
                <div className="grid grid-cols-2 gap-5 border-b py-4">
                  <div>
                    <p>
                      <span className="font-bold">Name :</span>{" "}
                      {report.userData.name}
                    </p>
                    <p>
                      <span className="font-bold">Age :</span>{" "}
                      {calculateAge(report.userData.dob)}
                    </p>
                    <p>
                      <span className="font-bold">Nationality :</span>{" "}
                      {report.userData.nationality || "Egyptian"}
                    </p>
                    <p>
                      <span className="font-bold">Department :</span>{" "}
                      {report.docData.speciality}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Issue Date :</span>{" "}
                      {slotDateFormat(report.appointmentData.slotDate)}
                    </p>
                    <p>
                      <span className="font-bold">Gender :</span>{" "}
                      {report.userData.gender}
                    </p>
                    <p>
                      <span className="font-bold">Phone No :</span>{" "}
                      {report.userData.phone}
                    </p>
                    <p>
                      <span className="font-bold">DR.w.report :</span>{" "}
                      {report.docData.name}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <p>
                    <span className="font-bold">Complaint :</span>{" "}
                    {report.complaint}
                  </p>
                  <p>
                    <span className="font-bold">Examination :</span>{" "}
                    {report.examination}
                  </p>
                  <p>
                    <span className="font-bold">Diagnosis :</span>{" "}
                    {report.diagnosis}
                  </p>
                  <div>
                    <span className="font-bold">Treatment :</span>
                    <ul className="list-disc pl-6">
                      {report.treatment.map((treat, i) => (
                        <li key={i}>
                          {treat.name} {treat.dosage && -`${treat.dosage}`}{" "}
                          {treat.duration && treat.duration}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p>
                    <span className="font-bold">Notes :</span> {report.notes}
                  </p>
                </div>
              </div>
            </div>

            {/* Doctor Signature + Footer */}
            <div>
              <div className="flex justify-between items-end mt-10 mb-30">
                <div>
                  <p className="italic">{report.docData.name}</p>
                  <p className="italic text-xs text-gray-500">
                    Doctor Signature
                  </p>
                </div>
                <div className="">
                  <Button
                    className=""
                    onClick={() => handlePrint(reportRefs.current[index])}
                  >
                    Print Report
                  </Button>
                </div>
              </div>

              <footer className="border-t pt-2 mt-6 text-center text-xs text-gray-600">
                <p>© 2025 جميع الحقوق محفوظة - مجمع الخدمات الطبية</p>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportsView;
