import React, { useContext, useEffect, useState, useRef } from "react";
import { DoctorContext } from "../context/DoctorContext";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "flowbite-react";
import { assets } from "../assets/assets";

const UserReportWithDoctor = () => {
  const { dtoken, backendUrl, getUserReportWithDoctor, reportData } =
    useContext(DoctorContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const reportRefs = useRef([]);

  useEffect(() => {
    if (!query) return setResults([]);

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/doctor/search`,
          { q: query },
          { headers: { dtoken } }
        );
        setResults(data.success ? data.users || [] : []);
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, dtoken, backendUrl]);

  const handlePrint = async (element) => {
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });
    const imgProps = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("report.pdf");
  };

  return (
    <div dir="ltr" className="w-full px-5 max-w-6xl m-5">
      {/* Search */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col items-center max-w-md mx-auto relative"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن المريض بالاسم، الرقم القومي أو الهاتف"
          className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {loading && <p className="mt-2 text-gray-500 text-sm">جاري البحث...</p>}
        {results.length > 0 && (
          <ul className="absolute top-12 w-full bg-white border rounded-md max-h-52 overflow-y-auto shadow-lg z-50">
            {results.map((user) => (
              <li
                key={user._id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => getUserReportWithDoctor(user._id)}
              >
                {user.name} - {user.nationalId || user.phone}
              </li>
            ))}
          </ul>
        )}
      </form>

      {/* Reports */}
      <section className="mt-8">
        <div className="max-h-[90vh] overflow-y-auto space-y-6">
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
                <div className="text-center mb-4  pb-5 ">
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
                <div className="report-body">
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
                      className=""
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
      </section>
    </div>
  );
};

export default UserReportWithDoctor;
