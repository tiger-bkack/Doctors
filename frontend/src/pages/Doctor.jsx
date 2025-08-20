import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Doctor = () => {
  const { speciality } = useParams();
  const { doctors, getDoctorList } = useContext(AppContext);
  const navigate = useNavigate();

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const appFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    appFilter();
    getDoctorList();
  }, [doctors, speciality]);

  return (
    <div dir="rtl">
      <p className="text-gray-600">تصفح الأطباء المتخصصين.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-[#5f6fff] text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          أختر التخصص المناسب
        </button>
        <section
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex " : "hidden sm:flex transition-all duration-200"
          }`}
        >
          <p
            onClick={() =>
              speciality === "طبيب عام"
                ? navigate("/doctors")
                : navigate("/doctors/طبيب عام")
            }
            className={`w-[94vw] sm:w-auto pr-3 py-1.5 pl-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "طبيب عام" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            طبيب عام
          </p>
          <p
            onClick={() =>
              speciality === "طبيب أمراض نساء وولاده"
                ? navigate("/doctors")
                : navigate("/doctors/طبيب أمراض نساء وولاده")
            }
            className={`w-[94vw] sm:w-auto pr-3 py-1.5 pl-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "طبيب أمراض نساء وولاده"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            طبيب أمراض نساء وولاده
          </p>
          <p
            onClick={() =>
              speciality === "طبيب أمراض جلدية"
                ? navigate("/doctors")
                : navigate("/doctors/طبيب أمراض جلدية")
            }
            className={`w-[94vw] sm:w-auto pr-3 py-1.5 pl-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "طبيب أمراض جلدية"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            طبيب أمراض جلدية
          </p>
          <p
            onClick={() =>
              speciality === "طبيب أطفال"
                ? navigate("/doctors")
                : navigate("/doctors/طبيب أطفال")
            }
            className={`w-[94vw] sm:w-auto pr-3 py-1.5 pl-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "طبيب أطفال" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            طبيب أطفال
          </p>
          <p
            onClick={() =>
              speciality === "طبيب مخ و أعصاب"
                ? navigate("/doctors")
                : navigate("/doctors/طبيب مخ و أعصاب")
            }
            className={`w-[94vw] sm:w-auto pr-3 py-1.5 pl-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "طبيب مخ و أعصاب" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            طبيب مخ و أعصاب
          </p>
          <p
            onClick={() =>
              speciality === "طبيب أمراض الجهاز الهضمي"
                ? navigate("/doctors")
                : navigate("/doctors/طبيب أمراض الجهاز الهضمي")
            }
            className={`w-[94vw] sm:w-auto pr-3 py-1.5 pl-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "طبيب أمراض الجهاز الهضمي"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            طبيب أمراض الجهاز الهضمي
          </p>
        </section>

        <section className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4  gap-y-6 px-3 sm:px-0">
          {filterDoc.map((items, index) => (
            <div
              className="border group border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
              onClick={() => navigate(`/appointment/${items._id}`)}
            >
              <img
                className={`bg-blue-50 ${
                  items.avalibale
                    ? "group-hover:bg-[#5f6fff] transition-all duration-500"
                    : "group-hover:bg-gray-500 transition-all duration-500"
                }  `}
                src={items.image}
                alt=""
              />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    items.avalibale ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${
                      items.avalibale ? "bg-green-500" : "bg-gray-500"
                    } `}
                  ></p>
                  <p>{items.avalibale ? "متاح" : "غير متاح حالياً"}</p>
                </div>
              </div>
              <div className="px-4 pb-4">
                <p className="text-gray-900 text-lg font-medium">
                  {items.name}
                </p>
                <p className="text-gray-600 text-sm">{items.speciality}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Doctor;
