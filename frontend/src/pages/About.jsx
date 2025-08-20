import { assets } from "../assets/assets";

const About = () => {
  return (
    <div dir="rtl">
      <h2 className="text-center text-2xl text-gray-500 my-10">
        من <span className="font-semibold text-gray-800"> نحن ؟</span>
      </h2>

      <section className="flex gap-10 flex-col md:flex-row w-full ">
        <img
          className="md:w-80 sm:w-[70%] transition-all duration-150"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col w-[100%] md:w-[60%] text-sm text-gray-900 gap-5 ">
          <p className="leading-5">
            مرحبًا بك في Prescripto، شريكك الموثوق في إدارة احتياجاتك الصحية بكل
            سهولة وكفاءة. نحن ندرك التحديات التي يواجهها الأفراد عند حجز مواعيد
            الأطباء أو تنظيم سجلاتهم الطبية، ولذلك صممنا منصتنا لتكون الوسيلة
            الأسرع والأبسط للوصول إلى الرعاية الصحية التي تستحقها.
          </p>

          <p>
            نحن في Prescripto ملتزمون بالتميّز في مجال تكنولوجيا الرعاية الصحية.
            نسعى باستمرار لتطوير منصتنا من خلال دمج أحدث التقنيات بهدف تحسين
            تجربة المستخدم وتقديم خدمة عالية الجودة في كل خطوة.
          </p>

          <p className="font-bold">رؤيتنا</p>

          <p>
            رؤيتنا في Prescripto هي خلق تجربة رعاية صحية سلسة وسهلة لكل مستخدم.
            نهدف إلى سد الفجوة بين المرضى ومقدمي الرعاية الصحية، وتسهيل الوصول
            إلى الخدمة الطبية المناسبة في الوقت المناسب، بطريقة أكثر ذكاءً
            وراحة.
          </p>
        </div>
      </section>

      <section className=" text-2xl text-gray-500 my-10">
        <h2>
          لماذا <span className="font-semibold text-gray-800">تختارنا ؟</span>
        </h2>

        <div className=" flex flex-col md:flex-row w-full text-sm my-10 ">
          <div className="border border-gray-300 sm:border-b-0 md:border-l-0 md:border py-10 px-10">
            <p className="mb-3 font-bold text-gray-900"> الكفاءة:</p>
            <p>
              نقدّم لك عملية حجز مواعيد سلسة وسريعة، تتناسب مع نمط حياتك المزدحم
              دون أي تعقيدات.
            </p>
          </div>
          <div className="border border-gray-300 border-b-0 md:border-l-0 md:border py-10 px-10">
            <p className="mb-3 font-bold text-gray-900"> الراحة:</p>
            <p>
              تمكّنك منصتنا من الوصول بسهولة إلى شبكة من الأطباء الموثوقين في
              منطقتك، في أي وقت ومن أي مكان.
            </p>
          </div>
          <div className="border border-gray-300  py-10 px-10">
            <p className="mb-3 font-bold text-gray-900">التخصيص:</p>
            <p>
              نوفّر لك توصيات صحية وتذكيرات مخصصة تساعدك على متابعة حالتك الصحية
              والبقاء دائمًا في المسار الصحيح.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
