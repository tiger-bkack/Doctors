import axios from "axios";
import { toast } from "react-toastify";

import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { atoken, getDoctorList, doctors, changeAvalibilty, backendUrl } =
    useContext(AdminContext);

  const deleteDoctor = async (docId) => {
    try {
      const { data } = await axios.delete(
        backendUrl + "/api/admin/delete-doctor",
        { docId },
        {
          headers: { atoken },
        }
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

  useEffect(() => {
    if (atoken) {
      getDoctorList();
    }
  }, [atoken]);
  return (
    <div dir="rtl" className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium"> قأمة الاطباء المتاحة</h1>
      <div dir="rtl" className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((items, index) => (
          <div
            key={index}
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
          >
            <img
              className={`bg-indigo-50 ${
                items.avalibale
                  ? "group-hover:bg-[#5f6fff] transition-all duration-500"
                  : "group-hover:bg-gray-500 transition-all duration-500"
              } transition-all duration-500 `}
              src={items.image}
              alt=""
            />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">
                {items.name}
              </p>
              <p className="text-zinc-600 text-sm">{items.speciality}</p>
              <div className=" mt-2 flex items-center gap-1 text-sm">
                <input
                  onChange={() => changeAvalibilty(items._id)}
                  type="checkbox"
                  checked={items.avalibale}
                />
                <p>متاج</p>
              </div>
              <div className="">
                <button
                  onClick={() => deleteDoctor(items._id)}
                  className="mt-3 py-0.5 px-3 text-sm text-red-500 border rounded-2xl cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-150
                }"
                >
                  حذف الطبيب
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
