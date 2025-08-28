import React, { useContext, useEffect, useRef } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Button } from "flowbite-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const AllReports = () => {
  const { getAllReport, dtoken, reportData } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

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

  useEffect(() => {
    if (dtoken) {
      getAllReport();
    }
  }, [dtoken]);

  return (
    reportData && (
      <div dir="ltr" className="w-full max-w-6xl m-5">
        <div className="w-full flex justify-center">
          <p className="mb-3 font-semibold uppercase text-2xl  ">Reports</p>
        </div>

        <div className="max-h-[95vh] min-h-[90vh] overflow-y-scroll">
          {reportData.map((items, index) => (
            <div
              ref={(el) => (reportRefs.current[index] = el)}
              key={index}
              className="p-15 mt-10 shadow-lg bg-white mx-auto my-8"
              style={{
                width: "210mm", // A4 width
                minHeight: "297mm", // A4 height
                padding: "20mm",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // يخلي التوقيع والفوتر تحت
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
                        {items.userData.name}
                      </p>
                      <p>
                        <span className="font-bold">Age :</span>{" "}
                        {calculateAge(items.userData.dob)}
                      </p>
                      <p>
                        <span className="font-bold">Nationality :</span>{" "}
                        {items.userData.nationality || "Egyptian"}
                      </p>
                      <p>
                        <span className="font-bold">Department :</span>{" "}
                        {items.docData.speciality}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-bold">Issue Date :</span>{" "}
                        {slotDateFormat(items.appointmentData.slotDate)}
                      </p>
                      <p>
                        <span className="font-bold">Gender :</span>{" "}
                        {items.userData.gender}
                      </p>
                      <p>
                        <span className="font-bold">Phone No :</span>{" "}
                        {items.userData.phone}
                      </p>
                      <p>
                        <span className="font-bold">DR.w.report :</span>{" "}
                        {items.docData.name}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <p>
                      <span className="font-bold">Complaint :</span>{" "}
                      {items.complaint}
                    </p>
                    <p>
                      <span className="font-bold">Examination :</span>{" "}
                      {items.examination}
                    </p>
                    <p>
                      <span className="font-bold">Diagnosis :</span>{" "}
                      {items.diagnosis}
                    </p>
                    <div>
                      <span className="font-bold">Treatment :</span>
                      <ul className="list-disc pl-6">
                        {items.treatment.map((treat, i) => (
                          <li key={i}>
                            {treat.name} {treat.dosage && -`${treat.dosage}`}{" "}
                            {treat.duration && `${treat.duration}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p>
                      <span className="font-bold">Notes :</span> {items.notes}
                    </p>
                  </div>
                </div>
              </div>

              {/* Doctor Signature + Footer */}
              <div>
                <div className="flex justify-between items-end mt-10 mb-30">
                  <div>
                    <p className="italic">{items.docData.name}</p>
                    <p className="italic text-xs text-gray-500">
                      Doctor Signature
                    </p>
                  </div>
                  <div className="">
                    <Button
                      className="no-print"
                      onClick={() => handlePrint(reportRefs.current[index])}
                    >
                      Print Report
                    </Button>
                  </div>
                </div>

                {/* Footer */}
                <footer className="border-t pt-2 mt-6 text-center text-xs text-gray-600">
                  <p>© 2025 جميع الحقوق محفوظة - مجمع الخدمات الطبية</p>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default AllReports;
