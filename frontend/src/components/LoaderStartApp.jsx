import React from "react";
import { assets } from "../assets/assets";

function LoaderStartApp() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#5f6fff]">
      {/* اللوجو */}
      <img
        src={assets.logo}
        alt="Logo"
        className="w-28 h-28 text-white object-contain mb-6 drop-shadow-md animate-bounce"
      />

      {/* النصوص */}
      <div className="flex flex-col items-center mb-8">
        <p className="text-4xl font-extrabold text-white tracking-wide">
          سلامتك
        </p>
        <p className="text-base font-medium text-white mt-1">راحة · طمأنينة</p>
      </div>

      {/* النقاط المتحركة */}
      {/* <div className="flex space-x-3">
        <span className="w-3 h-3 bg-[#5f6fff] rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-[#5f6fff] rounded-full animate-bounce [animation-delay:200ms]"></span>
        <span className="w-3 h-3 bg-[#5f6fff] rounded-full animate-bounce [animation-delay:400ms]"></span>
      </div> */}
    </div>
  );
}

export default LoaderStartApp;
