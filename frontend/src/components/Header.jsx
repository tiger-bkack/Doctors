import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div
      dir="rtl"
      className=" flex flex-col md:flex-row flex-wrap  bg-[#5f6fff] rounded-lg px-6 md-px-10 lg:px-20"
    >
      {/* left section */}
      <section
        dir="rtl"
        className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]"
      >
        <p className="text-3xl md:text-4xl text-white font-Changa font-semibold leading-tight  md:leading-tight lg:leading-tight ">
          أحجز موعدك الان <br className="hidden sm:block" />
          مع نخبة من الاطباء الموثقين
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-Changa">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            تصفح ببساطة قائمتنا الشاملة من الأطباء الموثوق بهم, وحدد موعدك بدون
            أي تاعب.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white py-3 px-8 rounded-full font-Changa text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 shadow-2xl"
        >
          <img className="w-3" src={assets.arrow_icon} alt="" />
          أحجذ موعدك من هنا
        </a>
      </section>
      {/* -----------left section--------- */}
      {/* right section */}

      <section className="md:w-1/2 relative drop-shadow-2xl">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </section>
      {/* -----right section------ */}
    </div>
  );
};

export default Header;
