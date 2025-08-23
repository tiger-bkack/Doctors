import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const AllReports = () => {
  const { getAllReport, dtoken, reportData } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getAllReport();
    }
  }, [dtoken]);
  return (
    reportData && (
      <div dir="ltr" className="w-full max-w-6xl m-5">
        <p className="mb-3 font-medium text-lg">REports</p>
        {reportData.map((items, index) => (
          <div className="">
            <div
              key={index}
              className="bg-white  w-full rounded px-8 py-8 max-w-4xl max-h-[90vh] min-h-[80vh]  overflow-y-scroll"
            >
              {/*First section header section */}
              <div className="">
                <div className="flex items-center gap-0.5 text-xs">
                  <img className="w-20 pl-1 " src={assets.logo} alt="" />
                  <div className="w-27 sm:w-30 cursor-pointer flex flex-col ">
                    <p className="text-3xl font-bold text-[#000]">سلامـتك</p>
                    <p className="text-xs text-gray-400">راحة . طمأنينة</p>
                  </div>
                </div>

                <div className="font-medium text-lg flex flex-col items-center-safe">
                  <p>مجمع الخدمات الطبية</p>
                  <p>Medical Report</p>
                </div>
              </div>

              {/*secand section  */}
              <div className="border">
                <div className="border-b-2 grid grid-cols-2 gap-5">
                  <div className="flex items-center gap-10">
                    <div className="">
                      <p>Name :</p>
                      <p>Age :</p>
                      <p>Nationality :</p>
                      <p>Department :</p>
                    </div>
                    <div className="">
                      <p>{items.userData.name}</p>
                      <p>{calculateAge(items.userData.dob)}</p>
                      <p>
                        {items.userData.nationality
                          ? items.userData.nationality
                          : "Egyption"}
                      </p>
                      <p>{items.docData.speciality}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-10">
                    <div className="">
                      <p>Issue Date :</p>
                      <p>gender :</p>
                      <p>Phone No :</p>
                      <p>DR.w.report</p>
                    </div>
                    <div className="">
                      <p>{slotDateFormat(items.appointmentData.slotDate)}</p>
                      <p>{items.userData.gender}</p>
                      <p>{items.userData.phone}</p>
                      <p>{items.docData.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default AllReports;
