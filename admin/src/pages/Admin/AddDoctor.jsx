import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImage, setDocImage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [consultationFees, setConsultationFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("طبيب عام");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [startBookedFrom, setStartBookedFrom] = useState("");
  const [startBookedTo, setStartBookedTo] = useState("");
  const [booking_period, setBooking_period] = useState("");
  const [phone, setPhone] = useState("");

  const [loader, setLoader] = useState(false);

  const { atoken, backendUrl } = useContext(AdminContext);

  const submitHandle = async (event) => {
    event.preventDefault();
    try {
      setLoader(true);

      if (!docImage) {
        toast.error("Please select image doctor");
      }

      const formData = new FormData();

      formData.append("image", docImage);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("experince", experience);
      formData.append("about", about);
      formData.append("fees", fees);
      formData.append("phone", phone);
      formData.append("consultation_fees", consultationFees);

      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      formData.append(
        "start_booked",
        JSON.stringify({
          from: startBookedFrom,
          to: startBookedTo,
          booking_period: booking_period,
        })
      );

      // console form
      // formData.forEach((value, key) => {
      //   console.log(`${key} : ${value}`);
      // });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: { atoken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImage(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("");
        setFees("");
        setAbout("");
        setSpeciality("");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setConsultationFees("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <form dir="rtl" onSubmit={submitHandle} className="m-5 w-full ">
      <p className="mb-3 text-lg font-medium flex items-start">
        أضافه طبيب جديد
      </p>

      <div className="bg-white w-full rounded px-8 py-8 max-w-4xl max-h-[90vh] overflow-y-scroll">
        <div dir="rtl" className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={
                docImage ? URL.createObjectURL(docImage) : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImage(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            تحميل الصوره الشخصية <br />
            للطبيب
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>أسم الطبيب :</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                type="text"
                placeholder="أسم الطبيب"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1 border-gray-300">
              <p>البريد الألكتروني للطبيب :</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="البريد الألكتروني"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1 border-gray-300">
              <p>كلمة السر للطبيب :</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="كلة السر"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1 border-gray-300">
              <p>رقم الهاتف</p>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="رقم الهاتف"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>سنوات الخبره</p>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                name=""
                id=""
              >
                <option value="1 Year">1 سنه</option>
                <option value="2 Year">2 سنه</option>
                <option value="3 Year">3 سنه</option>
                <option value="4 Year">4 سنه</option>
                <option value="5 Year">5 سنه</option>
                <option value="6 Year">6 سنه</option>
                <option value="7 Year">7 سنه</option>
                <option value="8 Year">8 سنه</option>
                <option value="9 Year">9 سنه</option>
                <option value="10 Year">10 سنه</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>سعر الكشف :</p>
              <input
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                type="text"
                placeholder="سعر الكشف"
                required
              />
            </div>
          </div>

          {/* Left section */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>سعر الاستشارة :</p>
              <input
                value={consultationFees}
                onChange={(e) => setConsultationFees(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                type="text"
                placeholder="سعر الكشف"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>التخصص :</p>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                name=""
                id=""
              >
                <option value="طبيب عام">طبيب عام</option>
                <option value="طبيب أمراض نساء وولاده">
                  طبيب أمراض نساء وولاده
                </option>
                <option value="طبيب أمراض جلدية">طبيب أمراض جلدية</option>
                <option value="طبيب أطفال">طبيب أطفال</option>
                <option value="طبيب مخ و أعصاب">طبيب مخ و أعصاب</option>
                <option value="طبيب أمراض الجهاز الهضمي">
                  طبيب أمراض الجهاز الهضمي
                </option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>درجه التعليم </p>
              <input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                type="text"
                required
                placeholder="الدرجة"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>العنوان :</p>
              <input
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                type="text"
                required
                placeholder="العنوان الاول"
              />
              <input
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                type="text"
                required
                placeholder="العنوان الثاني"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>مواعيد العمل:</p>
              <input
                value={startBookedFrom}
                onChange={(e) => setStartBookedFrom(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                type="text"
                required
                placeholder="من الساعه"
              />
              <input
                value={startBookedTo}
                onChange={(e) => setStartBookedTo(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                type="text"
                required
                placeholder="إلي الساعه"
              />
              <input
                value={booking_period}
                onChange={(e) => setBooking_period(e.target.value)}
                className="border rounded px-3 py-2 border-gray-300"
                type="text"
                required
                placeholder="مده الكشف الواحد"
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">نبذه عن الطبيب :</p>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full px-7 pt-2 border rounded border-gray-300"
            placeholder="اكتب نبذه عن مميزات الطبيب..."
            rows={5}
          ></textarea>
        </div>

        <button className="bg-[#5f6fff] px-10 py-3 mt-4 text-white rounded-full cursor-pointer hover:bg-[#5f6fffc0] transition-all duration-100">
          {loader ? "جاري أضاف الطبيب..." : "أضاف الطبيب"}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
