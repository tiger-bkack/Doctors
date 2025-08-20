import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div dir="rtl">
      <h2 className="text-center text-2xl text-gray-500 my-10">
        تواصل <span className="font-semibold text-gray-800"> معنا</span>
      </h2>

      <section className="flex justify-center items-center gap-10 flex-col md:flex-row w-full ">
        <img
          className="md:w-80 sm:w-[70%] transition-all duration-150"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col  text-sm text-gray-900 gap-5 ">
          <p className="font-bold text-gray-800">مكتبنا</p>
          <p className="text-gray-700">
            كفر علي شرف الدين، <br />
            كفر شكر، بنها، القليوبية – مصر
          </p>
          <p>
            الهاتف: 01555434861
            <br />
            البريد الإلكتروني: engmohamedali409@gmail.com
          </p>
          <p className="font-bold text-gray-800">الوظائف في Prescripto</p>
          <p>
            انضم إلى فريقنا وكن جزءًا من رحلتنا نحو تحسين الرعاية الصحية
            بالتكنولوجيا. <br /> اكتشف المزيد عن فرق العمل والفرص الوظيفية
            المتاحة لدينا.
          </p>
          <p className="py-2 px-7 border border-gray-700 w-40 text-sm hover:bg-gray-200 cursor-pointer">
            استعرض الوظائف
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
