import { AdminContext } from "@/context/AdminContext";
import React, { useContext, useEffect, useState, useRef } from "react";
import { assets } from "../../assets/assets";
import { Button, Modal } from "flowbite-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { FaPrint, FaRegEdit, FaSave, FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AppContext } from "@/context/AppContext";
import EditReport from "@/components/Reports/Admin/EditReport";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminReports = () => {
  const {
    getAllUserReportToAdmin,
    atoken,
    deleteReportToAdmin,
    reportData,
    backendUrl,
    getUserReportWithDoctorFromAdmin,
  } = useContext(AdminContext);

  const { reportId } = useParams();

  const { calculateAge, slotDateFormat } = useContext(AppContext);
  const [selectReport, setSelectReport] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleUpdateReport = async (reportItem) => {
    setSelectReport(reportItem);
    setOpenModal(true);
  };

  useEffect(() => {
    if (atoken) getAllUserReportToAdmin();
    if (!query) return setResults([]);

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/admin/search`,
          { q: query },
          { headers: { atoken } }
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
  }, [atoken, query, backendUrl]);

  return (
    reportData && (
      <div dir="ltr" className="w-full max-w-6xl m-5 bg-white rounded-2xl">
        {/* Search */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center max-w-md mx-auto relative my-10 "
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن المريض بالاسم، الرقم القومي أو الهاتف"
            className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {loading && (
            <p className="mt-2 text-gray-500 text-sm">جاري البحث...</p>
          )}
          {results.length > 0 && (
            <ul className="absolute  top-12 w-full bg-white border rounded-md max-h-52 overflow-y-auto shadow-lg z-50">
              {results.map((user) => (
                <li
                  key={user._id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => getUserReportWithDoctorFromAdmin(user._id)}
                >
                  {user.name} - {user.nationalId || user.phone}
                </li>
              ))}
            </ul>
          )}
        </form>

        <div className="max-h-[85vh] min-h-[70vh] overflow-y-scroll ">
          {(Array.isArray(reportData) ? reportData : [reportData]).map(
            (items, index) => (
              <div
                key={items._id || index}
                className="flex flex-col justify-center items-center "
              >
                {/* أزرار التحكم */}
                <div
                  dir="rtl"
                  className="mt-10 w-auto bg-white mx-auto  my-0 flex items-center justify-baseline"
                >
                  <button
                    className="py-1 px-10  flex items-center justify-center gap-2 group cursor-pointer border-l-1 border-gray-500"
                    onClick={() => handlePrint(reportRefs.current[index])}
                  >
                    <p className="text-gray-500 group-hover:text-gray-900 transition-all duration-150">
                      طباعه
                    </p>
                    <FaPrint className="text-[20px] text-gray-500 group-hover:text-gray-900 transition-all duration-150" />
                  </button>

                  <button
                    onClick={() => handleUpdateReport(items)}
                    className="py-1 px-10  flex items-center justify-center gap-2 group cursor-pointer border-l-1 border-gray-500"
                  >
                    <p className="text-gray-500 group-hover:text-gray-900 transition-all duration-150">
                      تعديل
                    </p>
                    <FaRegEdit className="text-[20px] text-gray-500 group-hover:text-gray-900 transition-all duration-150" />
                  </button>

                  <button
                    onClick={() => deleteReportToAdmin(items._id)}
                    className="py-1 px-10  flex items-center justify-center gap-2 group cursor-pointer border-l-1 border-gray-500"
                  >
                    <p className="text-gray-500 group-hover:text-gray-900 transition-all duration-150">
                      حذف
                    </p>
                    <MdDelete className="text-[20px] text-gray-500 group-hover:text-gray-900 transition-all duration-150" />
                  </button>

                  <button className="py-1 px-10  flex items-center justify-center gap-2 group cursor-pointer">
                    <p className="text-gray-500 group-hover:text-gray-900 transition-all duration-150">
                      مشاركة
                    </p>
                    <FaShare className="text-[20px] text-gray-500 group-hover:text-gray-900 transition-all duration-150" />
                  </button>
                </div>

                {/* التقرير نفسه */}
                <div
                  ref={(el) => (reportRefs.current[index] = el)}
                  className="p-15 mt-1 bg-white mx-auto my-8"
                  style={{
                    width: "210mm", // A4 width
                    minHeight: "297mm", // A4 height
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
                          <p className="text-sm text-gray-500">
                            راحة . طمأنينة
                          </p>
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
                            {items.userData?.name || "N/A"}
                          </p>
                          <p>
                            <span className="font-bold">Age :</span>{" "}
                            {items.userData?.dob
                              ? calculateAge(items.userData.dob)
                              : "N/A"}
                          </p>
                          <p>
                            <span className="font-bold">Nationality :</span>{" "}
                            {items.userData?.nationality || "Egyptian"}
                          </p>
                          <p>
                            <span className="font-bold">Department :</span>{" "}
                            {items.docData?.speciality || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className="font-bold">Issue Date :</span>{" "}
                            {items.appointmentData?.slotDate
                              ? slotDateFormat(items.appointmentData.slotDate)
                              : "N/A"}
                          </p>
                          <p>
                            <span className="font-bold">Gender :</span>{" "}
                            {items.userData?.gender || "N/A"}
                          </p>
                          <p>
                            <span className="font-bold">Phone No :</span>{" "}
                            {items.userData?.phone || "N/A"}
                          </p>
                          <p>
                            <span className="font-bold">DR.w.report :</span>{" "}
                            {items.docData?.name || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-10">
                        <p>
                          <span className="font-bold">Complaint :</span>{" "}
                          {items.complaint || "N/A"}
                        </p>
                        <p>
                          <span className="font-bold">Examination :</span>{" "}
                          {items.examination || "N/A"}
                        </p>
                        <p>
                          <span className="font-bold">Diagnosis :</span>{" "}
                          {items.diagnosis || "N/A"}
                        </p>
                        <div>
                          <span className="font-bold">Treatment :</span>
                          <ul className="list-disc pl-6">
                            {items.treatment?.map((treat, i) => (
                              <li key={treat._id || i}>
                                {treat.name}{" "}
                                {treat.dosage && -`${treat.dosage}`}{" "}
                                {treat.duration && treat.duration}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p>
                          <span className="font-bold">Notes :</span>{" "}
                          {items.notes || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Signature + Footer */}
                  <div>
                    <div className="flex justify-between items-end mt-10 mb-30">
                      <div>
                        <p className="italic">{items.docData?.name || "N/A"}</p>
                        <p className="italic text-xs text-gray-500">
                          Doctor Signature
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <footer className="border-t pt-2 mt-6 text-center text-xs text-gray-600">
                      <p>© 2025 جميع الحقوق محفوظة - مجمع الخدمات الطبية</p>
                    </footer>
                  </div>
                </div>
              </div>
            )
          )}
          <Modal
            size="6xl"
            show={openModal}
            onClose={() => setOpenModal(false)}
          >
            {selectReport && (
              <EditReport
                doctorInfo={selectReport.docData}
                setOpenModal={setOpenModal}
                reportInfo={selectReport}
              />
            )}
          </Modal>
        </div>
      </div>
    )
  );
};

export default AdminReports;
