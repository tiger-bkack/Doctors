import React, { useContext, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { AppContext } from "../../context/AppContext";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";
const AddReport = ({ appointmentId, items, setOpenModal }) => {
  const { calculateAge, slotDateFormat } = useContext(AppContext);
  const { dtoken, backendUrl } = useContext(DoctorContext);

  const [complaint, setComplaint] = useState("");
  const [examination, setExamination] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState([
    { name: "", dosage: "", duration: "" },
  ]);
  const [notes, setNotes] = useState("");
  const [nextVisit, setNextVisit] = useState("");
  const [loader, setLoader] = useState(false);

  // إضافة علاج جديد
  const addTreatment = () => {
    setTreatment([...treatment, { name: "", dosage: "", duration: "" }]);
  };

  // تعديل بيانات العلاج
  const handleTreatmentChange = (index, field, value) => {
    const newTreatment = [...treatment];
    newTreatment[index][field] = value;
    setTreatment(newTreatment);
  };

  // حذف علاج
  const removeTreatment = (index) => {
    const newTreatment = treatment.filter((_, i) => i !== index);
    setTreatment(newTreatment);
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const formData = {
        complaint,
        examination,
        diagnosis,
        treatment, // Array of objects
        notes,
        nextVisit,
        appointmentId,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/add-report",
        formData,
        { headers: { dtoken } }
      );

      if (data.success) {
        toast.success(data.message);
        setOpenModal(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="bg-gray-50  rounded-2xl">
      <>
        <ModalHeader className="bg-[#5f6fff] h-15">
          <span className="text-white font-semibold">أضافة تقرير</span>
        </ModalHeader>
        <ModalBody>
          <div className="text-black ">
            {/* بيانات المريض */}
            <div className="grid grid-cols-2 gap-5 border-b border-gray-500 pb-3">
              <div>
                <p>
                  <span className="font-bold text-[#5f6fff] pr-3">Name :</span>{" "}
                  {items.userData.name}
                </p>
                <p>
                  <span className="font-bold text-[#5f6fff] pr-5">Age :</span>{" "}
                  {calculateAge(items.userData.dob)}
                </p>
                <p>
                  <span className="font-bold text-[#5f6fff] pr-3">
                    Department :
                  </span>{" "}
                  {items.docData.speciality}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-bold text-[#5f6fff] pr-4">
                    Issue Date :
                  </span>{" "}
                  {slotDateFormat(items.slotDate)}
                </p>
                <p>
                  <span className="font-bold text-[#5f6fff] pr-10">
                    Gender :
                  </span>{" "}
                  {items.userData.gender}
                </p>
                <p>
                  <span className="font-bold text-[#5f6fff] pr-5">
                    Phone No :
                  </span>{" "}
                  {items.userData.phone}
                </p>
              </div>
            </div>

            {/* الفورم */}
            <form
              id="reportForm"
              dir="ltr"
              onSubmit={submitHandle}
              className="m-2 w-full"
            >
              <div className="flex flex-col justify-between lg:flex-row items-start gap-2 text-gray-600 ">
                {/* Complaint / Examination / Diagnosis */}
                <div className="w-full">
                  <div className="flex flex-col gap-1">
                    <p>Complaint :</p>
                    <textarea
                      value={complaint}
                      onChange={(e) => setComplaint(e.target.value)}
                      className="border rounded px-3 py-2 border-gray-300"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Examination :</p>
                    <textarea
                      value={examination}
                      onChange={(e) => setExamination(e.target.value)}
                      className="border rounded px-3 py-2 border-gray-300"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Diagnosis :</p>
                    <textarea
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      className="border rounded px-3 py-2 border-gray-300"
                      required
                    />
                  </div>
                </div>

                {/* Treatment / Notes / Next Visit */}
                <div className="w-full flex flex-col gap-1">
                  <div>
                    <p className="mb-2 font-medium">Treatment:</p>
                    {treatment.map((t, index) => (
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
                            handleTreatmentChange(
                              index,
                              "dosage",
                              e.target.value
                            )
                          }
                          className="border rounded px-2 py-1 flex-1"
                          placeholder="Dosage"
                        />
                        <input
                          value={t.duration}
                          onChange={(e) =>
                            handleTreatmentChange(
                              index,
                              "duration",
                              e.target.value
                            )
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
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="border rounded px-3 py-2 border-gray-300 w-full"
                    />
                  </div>

                  <div>
                    <p>Next Visit</p>
                    <input
                      value={nextVisit}
                      onChange={(e) => setNextVisit(e.target.value)}
                      className="border rounded px-3 py-2 border-gray-300 w-full"
                      type="datetime-local"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ModalBody>

        {/* أزرار المودال */}
        <ModalFooter>
          {/* مربوط بالفورم */}
          <Button type="submit" form="reportForm">
            {loader ? "جاري الحفظ..." : "حفظ التقارير"}
          </Button>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            ألغاء
          </Button>
        </ModalFooter>
      </>
    </div>
  );
};

export default AddReport;
