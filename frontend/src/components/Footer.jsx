import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navgate = useNavigate();
  return (
    <div dir="rtl" className="md:mx-10">
      <section className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/*Letft section */}
        <div className="">
          <div className=" flex items-center gap-2">
            <img className="w-20" src={assets.logo} alt="" />
            <div className="w-22 mb-5 sm:w-26 cursor-pointer flex flex-col gap-0.5">
              <p className="text-3xl font-bold text-[#5f6fff]">سلامتك</p>
              <p className="text-xs font-medium text-gray-500">
                راحة . طمأنينة
              </p>
            </div>
          </div>
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            نحن نُقدّم خدمة حجز المواعيد الطبية أونلاين بكل سهولة، مع إمكانية
            اختيار الطبيب والتخصص المناسب، وتأكيد الحجز برسالة عبر واتساب. هدفنا
            هو تسهيل الوصول للرعاية الصحية وتنظيم وقتك بشكل أفضل.
          </p>
        </div>
        {/*------Letft section------- */}

        {/*center section */}
        <div className="">
          <p className="text-xl font-medium mb-5">المؤسسة</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li
              className="cursor-pointer hover:text-gray-900 transition-all duration-100"
              onClick={() => {
                navgate("/");
                scrollTo(0, 0);
              }}
            >
              الصفحة الرئسية
            </li>
            <li
              className="cursor-pointer hover:text-gray-900 transition-all duration-100"
              onClick={() => {
                navgate("/about");
                scrollTo(0, 0);
              }}
            >
              من نحن
            </li>
            <li
              className="cursor-pointer hover:text-gray-900 transition-all duration-100"
              onClick={() => {
                navgate("/contact");
                scrollTo(0, 0);
              }}
            >
              تواصل معنا{" "}
            </li>
            <li
              className="cursor-pointer hover:text-gray-900 transition-all duration-100"
              onClick={() => {
                navgate("/about");
                scrollTo(0, 0);
              }}
            >
              سياسة الخصوصصية
            </li>
          </ul>
        </div>
        {/*------center section------- */}

        {/*right section */}
        <div className="">
          <p className="text-xl font-medium mb-5">معلومات التواصل</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li> رقم الهاتف : +20 01555434861</li>
            <li>البريد الالكتروني : engmohamedali409@gmail.com</li>
          </ul>
        </div>
        {/*------right section------- */}
      </section>

      {/*---------- Copyright ©text -------------*/}
      <div className="">
        <hr className=" bg-gray-600" />
        <p className="text-center py-5 text-sm">
          Copyright © 2025 Mohamed - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
