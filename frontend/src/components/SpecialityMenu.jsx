import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center py-16 text-gray-800 gap-4"
      id="speciality"
    >
      <h1 className="text-3xl font-medium">البحث حسب التخصص </h1>
      <p className="sm:w-1/3 text-center text-sm">
        تصفح ببساطة قائمتنا الواسعة من الأطباء الموثق بهم,وحدد موعدك دون أي
        متاعب
      </p>
      <div className="flex items-center sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((items, index) => (
          <Link
            onClick={() => onscroll(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-300"
            key={index}
            to={`/doctors/${items.speciality}`}
          >
            <img className="w-16 sm:w-24 mb-2 " src={items.image} alt="" />
            <p>{items.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
