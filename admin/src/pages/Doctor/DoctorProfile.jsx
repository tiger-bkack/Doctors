import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { getDoctorProfile, dtoken, docInfo, setDocInfo, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: docInfo.address,
        fees: docInfo.fees,
        avalibale: docInfo.avalibale,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dtoken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getDoctorProfile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dtoken) {
      getDoctorProfile();
    }
  }, [dtoken]);
  return (
    docInfo && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div className="">
            <img
              className="bg-[#5f6fff] w-full sm:max-w-64 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/*-------------Doctor info : name , degree , experienes----------- */}

            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {docInfo.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {docInfo.speciality} - {docInfo.degree}
                <button className="py-0.5 px-2 border text-xs rounded-full mr-2">
                  {docInfo.experince}
                </button>
              </p>
            </div>

            {/*----- doctor About ------ */}
            <div className=" flex flex-col  gap-1 text-sm font-medium text-neutral-800 mt-3">
              <p>عن الطبيب:</p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              تكليف الحجز:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setDocInfo((prev) => ({ ...prev, fees: e.target.value }))
                    }
                    value={docInfo.fees}
                  />
                ) : (
                  docInfo.fees
                )}
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>العنوان:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    value={docInfo.address.line1}
                    onChange={(e) => {
                      setDocInfo((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }));
                    }}
                    type="text"
                    name=""
                    id=""
                  />
                ) : (
                  docInfo.address.line1
                )}{" "}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    value={docInfo.address.line2}
                    onChange={(e) => {
                      setDocInfo((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }));
                    }}
                  />
                ) : (
                  docInfo.address.line2
                )}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input
                onChange={() =>
                  isEdit &&
                  setDocInfo((prev) => ({
                    ...prev,
                    avalibale: !prev.avalibale,
                  }))
                }
                checked={docInfo.avalibale}
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">متاح</label>
            </div>

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-[#5f6fff] text-sm  rounded-full mt-5 cursor-pointer hover:bg-[#5f6fff] hover:text-white transition-all duration-200"
              >
                جفظ التعديلات
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-[#5f6fff] text-sm  rounded-full mt-5 cursor-pointer hover:bg-[#5f6fff] hover:text-white transition-all duration-200"
              >
                تعديل
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
