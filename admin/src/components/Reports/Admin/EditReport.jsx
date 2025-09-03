import React, { useContext, useEffect } from "react";
import { Button, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "@/context/DoctorContext";
import { AppContext } from "@/context/AppContext";
import { AdminContext } from "@/context/AdminContext";

const EditReport = ({ reportInfo, setOpenModal }) => {
  const {
    atoken,
    reportData,
    setReportData,
    backendUrl,
    openNotificationWithIcon,
    getAllUserReportToAdmin,
  } = useContext(AdminContext);

  const { calculateAge, slotDateFormat } = useContext(AppContext);

  // لما يفتح المودال ينسخ البيانات من reportInfo لـ state
  useEffect(() => {
    if (reportInfo) {
      setReportData({
        complaint: reportInfo.complaint || "",
        examination: reportInfo.examination || "",
        diagnosis: reportInfo.diagnosis || "",
        treatment: reportInfo.treatment || [],
        notes: reportInfo.notes || "",
        nextVisit: reportInfo.nextVisit || "",
      });
    }
  }, [reportInfo]);

  // إضافة علاج جديد
  const addTreatment = () => {
    setReportData((prev) => ({
      ...prev,
      treatment: [...prev.treatment, { name: "", dosage: "", duration: "" }],
    }));
  };

  // تعديل بيانات العلاج
  const handleTreatmentChange = (index, field, value) => {
    const newTreatment = [...reportData.treatment];
    newTreatment[index][field] = value;
    setReportData((prev) => ({ ...prev, treatment: newTreatment }));
  };

  // حذف علاج
  const removeTreatment = (index) => {
    const newTreatment = reportData.treatment.filter((_, i) => i !== index);
    setReportData((prev) => ({ ...prev, treatment: newTreatment }));
  };

  // حفظ التعديل
  const editReportFromAdmin = async () => {
    try {
      // const reportDataForUpdated = {
      //   complaint: reportData.complaint,
      //   examination: reportData.examination,
      //   diagnosis: reportData.diagnosis,
      //   treatment: reportData.treatment,
      //   notes: reportData.notes,
      //   nextVisit: reportData.nextVisit,
      // };

      const { data } = await axios.post(
        backendUrl + "/api/admin/edit-report",
        {
          complaint: reportData.complaint,
          examination: reportData.examination,
          diagnosis: reportData.diagnosis,
          treatment: reportData.treatment,
          notes: reportData.notes,
          nextVisit: reportData.nextVisit,
          reportId: reportInfo._id,
        },
        { headers: { atoken } }
      );

      if (data.success) {
        //toast.success(data.message);
        getAllUserReportToAdmin();
        openNotificationWithIcon(
          "success",
          "تحديث التقارير من قبل الطبيب",
          data.message
        );
        setOpenModal(false);
      } else {
        openNotificationWithIcon(
          "error",
          "تحديث التقارير من قبل الطبيب",
          data.message
        );
        //toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      //toast.error(error.message);
      openNotificationWithIcon(
        "error",
        "تحديث التقارير من قبل الطبيب",
        error.message
      );
    }
  };
  return (
    <div>
      <ModalHeader>تعديل التقرير</ModalHeader>
      <ModalBody className="">
        <div className="text-black   ">
          {/* بيانات المريض */}
          <div className="grid grid-cols-2 gap-5 border-b pb-3 ">
            <div>
              <p>
                <span className="font-bold">Name :</span>{" "}
                {reportInfo.userData.name}
              </p>
              <p>
                <span className="font-bold">Age :</span>{" "}
                {calculateAge(reportInfo.userData.dob)}
              </p>
              <p>
                <span className="font-bold">Department :</span>{" "}
                {reportInfo.docData.speciality}
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold">Issue Date :</span>{" "}
                {slotDateFormat(reportInfo.appointmentData.slotDate)}
              </p>
              <p>
                <span className="font-bold">Gender :</span>{" "}
                {reportInfo.userData.gender}
              </p>
              <p>
                <span className="font-bold">Phone No :</span>{" "}
                {reportInfo.userData.phone}
              </p>
            </div>
          </div>

          {/* الفورم */}
          <div className="flex flex-col justify-between lg:flex-row items-start gap-2 text-gray-600 mt-5 min-h-[45vh] max-h-[50vh] overflow-y-scroll">
            {/* Complaint / Examination / Diagnosis */}
            <div className="w-full">
              <div className="flex flex-col gap-1">
                <p>Complaint :</p>
                <textarea
                  value={reportData.complaint}
                  onChange={(e) =>
                    setReportData((prev) => ({
                      ...prev,
                      complaint: e.target.value,
                    }))
                  }
                  className="border rounded px-3 py-2 border-gray-300"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Examination :</p>
                <textarea
                  value={reportData.examination}
                  onChange={(e) =>
                    setReportData((prev) => ({
                      ...prev,
                      examination: e.target.value,
                    }))
                  }
                  className="border rounded px-3 py-2 border-gray-300"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Diagnosis :</p>
                <textarea
                  value={reportData.diagnosis}
                  onChange={(e) =>
                    setReportData((prev) => ({
                      ...prev,
                      diagnosis: e.target.value,
                    }))
                  }
                  className="border rounded px-3 py-2 border-gray-300"
                  required
                />
              </div>
            </div>

            {/* Treatment / Notes / Next Visit */}
            <div className="w-full flex flex-col gap-1">
              <div>
                <p className="mb-2 font-medium">Treatment:</p>
                {(reportData.treatment || []).map((t, index) => (
                  <div
                    key={index}
                    className="flex gap-2 mb-2 items-center border border-gray-300 p-2 rounded"
                  >
                    <input
                      value={t.name}
                      onChange={(e) =>
                        handleTreatmentChange(index, "name", e.target.value)
                      }
                      className="border rounded px-2 py-1 flex-1"
                      placeholder="Medicine Name"
                      required
                    />
                    <input
                      value={t.dosage}
                      onChange={(e) =>
                        handleTreatmentChange(index, "dosage", e.target.value)
                      }
                      className="border rounded px-2 py-1 flex-1"
                      placeholder="Dosage"
                    />
                    <input
                      value={t.duration}
                      onChange={(e) =>
                        handleTreatmentChange(index, "duration", e.target.value)
                      }
                      className="border rounded px-2 py-1 flex-1"
                      placeholder="Duration"
                    />
                    <button
                      type="button"
                      onClick={() => removeTreatment(index)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTreatment}
                  className="text-blue-500 mt-2"
                >
                  + Add Treatment
                </button>
              </div>

              <div>
                <p>Notes</p>
                <textarea
                  value={reportData.notes}
                  onChange={(e) =>
                    setReportData((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  className="border rounded px-3 py-2 border-gray-300 w-full"
                />
              </div>

              <div>
                <p>Next Visit</p>
                <input
                  value={reportData.nextVisit}
                  onChange={(e) =>
                    setReportData((prev) => ({
                      ...prev,
                      nextVisit: e.target.value,
                    }))
                  }
                  className="border rounded px-3 py-2 border-gray-300 w-full"
                  type="datetime-local"
                />
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button className="cursor-pointer" onClick={editReportFromAdmin}>
          تأكيد
        </Button>
        <Button
          className="cursor-pointer"
          onClick={() => setOpenModal(false)}
          color="alternative"
        >
          إلغاء
        </Button>
      </ModalFooter>
    </div>
  );
};

export default EditReport;
