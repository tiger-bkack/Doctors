import React from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ReportBar from "../../components/ReportBar";
import { useState } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";

const Reports = () => {
  const { appointmentId } = useParams();
  const { dtoken, backendUrl } = useContext(DoctorContext);

  //console.log(appointmentId);

  const [complaint, setComplaint] = useState("");
  const [examination, setExamination] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");
  const [nextVisit, setNextVisit] = useState("");

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        complaint,
        examination,
        diagnosis,
        treatment,
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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form dir="ltr" onSubmit={submitHandle} className="m-5 w-full ">
      <div className="bg-white w-full rounded px-8 py-8 max-w-4xl max-h-[90vh] overflow-y-scroll">
        <div
          dir="rtl"
          className="flex items-center justify-center gap-4 mb-10 text-gray-800 font-semibold text-2xl"
        >
          <p>Adding Report</p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Complaint :</p>
              <textarea
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                type="text"
                placeholder="Complaint"
                required
                rows={3}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1 border-gray-300 ">
              <p>Examination :</p>
              <textarea
                value={examination}
                onChange={(e) => setExamination(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                type="text"
                placeholder="Examination"
                required
                rows={3}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1 border-gray-300">
              <p>Diagnosis</p>
              <textarea
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                type="text"
                placeholder="Diagnosis"
                required
                rows={3}
              />
            </div>
          </div>

          {/* Left section */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1 border-gray-300">
              <p>Treatment</p>
              <textarea
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                type="text"
                placeholder="Treatment"
                required
                rows={3}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1 border-gray-300">
              <p>Notes</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300 "
                type="text"
                placeholder="Notes"
                required
                rows={3}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1 border-gray-300">
              <p>NextVisit</p>
              <input
                value={nextVisit}
                onChange={(e) => setNextVisit(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                type="date"
                placeholder="NextVisit"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center my-3">
          <button
            type="submit"
            className="bg-[#5f6fff]   px-10 py-3 mt-4 text-white rounded-full cursor-pointer hover:bg-[#5f6fffc0] transition-all duration-100"
          >
            Save Report
          </button>
        </div>
      </div>
    </form>
  );
};

export default Reports;
