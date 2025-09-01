import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  Dropdown,
  DropdownItem,
  Modal,
} from "flowbite-react";
import { DoctorContext } from "../../context/DoctorContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { MdDelete } from "react-icons/md";

import { FaPrint, FaRegEdit, FaSave, FaShare } from "react-icons/fa";
import EditReport from "./EditReport";

const ViewModel = ({ setOpenViewReportModel, items }) => {
  const {
    getUserInfo,
    dtoken,
    userData,
    getUserReportWithDoctor,
    reportData,
    deletedReport,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat } = useContext(AppContext);
  console.log(userData);

  const [selectReport, setSelectReport] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (dtoken) {
      getUserInfo(items.userData._id);
      getUserReportWithDoctor(items.userId);
    }
  }, [dtoken]);

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

  console.log(items);
  return (
    items && (
      <div className="bg-gray-50">
        <ModalHeader className="bg-[#5f6fff] h-15">
          <span className="text-white font-semibold">تفاصيل التقرير</span>
        </ModalHeader>
        <ModalBody>
          <div className="w-full flex md:flex-row justify-between sm:flex-col-reverse  gap-5">
            {/*Left section */}
            <div className=" max-h-[60vh] min-h-[50vh] overflow-y-scroll rounded-2xl w-full bg-white shadow-2xl">
              {reportData.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-center text-2xl text-white">
                    لا توجد تقارير بعد
                  </p>
                </div>
              ) : (
                (Array.isArray(reportData) ? reportData : [reportData]).map(
                  (report, index) => (
                    <div className="">
                      <div
                        dir="rtl"
                        className="mt-10 w-full bg-white m-auto shadow-lg my-0 flex items-center justify-baseline"
                      >
                        <button
                          className="py-1 px-10 w-[20%] flex items-center justify-center gap-2 group cursor-pointer border-l-1 border-gray-500 rounded-l-2xl"
                          onClick={() => handlePrint(reportRefs.current[index])}
                        >
                          <p className="text-gray-500 group-hover:text-gray-900 transition-all duration-150">
                            طباعه
                          </p>
                          <FaPrint className="text-[20px] text-gray-500 group-hover:text-gray-900 transition-all duration-150" />
                        </button>

                        <button
                          onClick={() => handleUpdateReport(report)}
                          className="py-1 px-10 w-[20%] flex items-center justify-center gap-2 group cursor-pointer border-l-1 border-gray-500 rounded-l-2xl"
                        >
                          <p className="text-gray-500 group-hover:text-gray-900 transition-all duration-150">
                            تعديل
                          </p>
                          <FaRegEdit className="text-[20px] text-gray-500 group-hover:text-gray-900 transition-all duration-150" />
                        </button>

                        <button
                          onClick={() => deletedReport(report._id)}
                          className="py-1 px-10 w-[20%] flex items-center justify-center gap-2 group cursor-pointer border-l-1 border-gray-500 rounded-l-2xl"
                        >
                          <p className="text-gray-500 group-hover:text-gray-900 transition-all duration-150">
                            حذف
                          </p>
                          <MdDelete className="text-[20px] text-gray-500 group-hover:text-gray-900 transition-all duration-150" />
                        </button>

                        <button className="py-1 px-10 w-[20%] flex items-center justify-center gap-2 group cursor-pointer">
                          <p className="text-gray-500 group-hover:text-gray-900 transition-all duration-150">
                            مشاركة
                          </p>
                          <FaShare className="text-[20px] w-[20%] text-gray-500 group-hover:text-gray-900 transition-all duration-150 " />
                        </button>
                      </div>
                      <div
                        ref={(el) => (reportRefs.current[index] = el)}
                        className="p-15 mt-1 shadow-lg bg-white mx-auto my-8"
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
                              <img
                                className="w-20"
                                src={assets.logo}
                                alt="logo"
                              />
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
                                  <span className="font-bold">
                                    Nationality :
                                  </span>{" "}
                                  {items.userData?.nationality || "Egyptian"}
                                </p>
                                <p>
                                  <span className="font-bold">
                                    Department :
                                  </span>{" "}
                                  {items.docData?.speciality || "N/A"}
                                </p>
                              </div>
                              <div>
                                <p>
                                  <span className="font-bold">
                                    Issue Date :
                                  </span>{" "}
                                  {items.appointmentData?.slotDate
                                    ? slotDateFormat(
                                        items.appointmentData.slotDate
                                      )
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
                                  <span className="font-bold">
                                    DR.w.report :
                                  </span>{" "}
                                  {items.docData?.name || "N/A"}
                                </p>
                              </div>
                            </div>

                            <div className="mt-10">
                              <p>
                                <span className="font-bold">Complaint :</span>{" "}
                                {report.complaint || "N/A"}
                              </p>
                              <p>
                                <span className="font-bold">Examination :</span>{" "}
                                {report.examination || "N/A"}
                              </p>
                              <p>
                                <span className="font-bold">Diagnosis :</span>{" "}
                                {report.diagnosis || "N/A"}
                              </p>
                              <div>
                                <span className="font-bold">Treatment :</span>
                                <ul className="list-disc pl-6">
                                  {report.treatment?.map((treat, i) => (
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
                                {report.notes || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Doctor Signature + Footer */}
                        <div>
                          <div className="flex justify-between items-end mt-10 mb-30">
                            <div>
                              <p className="italic">
                                {items.docData?.name || "N/A"}
                              </p>
                              <p className="italic text-xs text-gray-500">
                                Doctor Signature
                              </p>
                            </div>
                          </div>

                          {/* Footer */}
                          <footer className="border-t pt-2 mt-6 text-center text-xs text-gray-600">
                            <p>
                              © 2025 جميع الحقوق محفوظة - مجمع الخدمات الطبية
                            </p>
                          </footer>
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
            </div>

            {/* right section */}
            <div className=" w-full h-full  flex flex-1 items-center justify-center ">
              <Card className=" max-h-[300px] min-h-[300px] max-w-[300px]  min-w-[300px] !bg-[#5f6fff] border-none  drop-shadow-2xl">
                <div className="flex flex-col items-center pb-10">
                  <img
                    alt="Bonnie image"
                    height="96"
                    src={items.userData.image}
                    width="96"
                    className="mb-3 rounded-full shadow-lg"
                  />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {items.userData.name}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400"></span>
                  <div className="mt-4 flex gap-5 text-white">
                    <div className="flex flex-col items-center gap-2">
                      <p>عدد الحجزات </p>
                      <p>{userData.userAppointment}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <p>عدد التقارير </p>
                      <p>{userData.userReport}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpenViewReportModel(false)}>إغلاق</Button>
        </ModalFooter>

        <Modal size="6xl" show={openModal} onClose={() => setOpenModal(false)}>
          {selectReport && (
            <EditReport
              doctorInfo={selectReport.docData}
              setOpenModal={setOpenModal}
              reportInfo={selectReport}
            />
          )}
        </Modal>
      </div>
    )
  );
};

export default ViewModel;
