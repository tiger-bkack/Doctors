import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const TopDoctor = () => {
  const navigate = useNavigate();
  const { doctors, getDoctorList, token } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      getDoctorList();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">أفضل الأطباء للحجز</h1>
      <p className="sm:w-1/3 text-center text-sm">
        تصفح ببساطة قائمتنا الشاملة للأطباء الموئوق بهم.
      </p>

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((items, index) => (
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
              }  transition-all duration-500`}
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
              <p className="text-gray-900 text-lg font-medium">{items.name}</p>
              <p className="text-gray-600 text-sm">{items.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-100 hover:bg-blue-200 hover:font-semibold transition-all duration-200 text-gray-600 py-3 px-12 rounded-full mt-10 shadow-2xl cursor-pointer"
      >
        كل الأطباء
      </button>
    </div>
  );
};

export default TopDoctor;
