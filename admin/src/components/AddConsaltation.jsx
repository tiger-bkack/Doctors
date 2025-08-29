import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { DoctorContext } from "../context/DoctorContext";
import { toast } from "react-toastify";

const AddConsaltation = ({ setOpenAddConsualtationModel, items }) => {
  const { backendUrl, dtoken } = useContext(DoctorContext);

  const [consaltationDay, setConsaltationDay] = useState(null);
  const [consaltationNotes, setConsaltationNotes] = useState("");
  const [message, setMessage] = useState(null);
  const handelAddConsaltation = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/add-consualtation",
        {
          consultDay: consaltationDay,
          notes: consaltationNotes,
          userId: items.userId,
          appointmentId: items._id,
          amount: items.docData.consultation_fees,
        },
        { headers: { dtoken } }
      );
      if (data.success) {
        console.log(data.message);

        toast.success(data.message);
        setOpenAddConsualtationModel(false);
        setConsaltationDay(null);
        setConsaltationNotes("");
      } else {
        toast.error(data.message);
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <ModalHeader>Create Consualtation</ModalHeader>
      <ModalBody>
        <div className="space-y-3  ">
          <form onSubmit={handelAddConsaltation} id="consaltation">
            <div className="space-y-3">
              <p className="text-black text-lg">chose day to consaltation :</p>
              <input
                value={consaltationDay}
                onChange={(e) => setConsaltationDay(e.target.value)}
                type="date"
                className="w-full py-2 active:bg-[#5f6fff] border px-2 rounded-md border-gray-300 text-gray-900 cursor-pointer"
              />
            </div>
            <p dir="rtl" className="my-2 font-semibold text-sm text-red-700">
              {message ? message : ""}
            </p>
            <div className="space-y-2 mt-5">
              <p className="text-black text-lg">If you have any notes :</p>
              <textarea
                value={consaltationNotes}
                onChange={(e) => setConsaltationNotes(e.target.value)}
                type="text"
                rows={4}
                className="w-full py-2 active:bg-[#5f6fff] border px-2 rounded-md border-gray-300 text-gray-900 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button form="consaltation" type="submit">
          Save
        </Button>
        <Button
          color="alternative"
          onClick={() => setOpenAddConsualtationModel(false)}
        >
          Decline
        </Button>
      </ModalFooter>
    </div>
  );
};

export default AddConsaltation;
