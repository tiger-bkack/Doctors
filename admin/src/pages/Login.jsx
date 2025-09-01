import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("المالك");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setAtoken, backendUrl } = useContext(AdminContext);
  const { setDtoken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      if (state === "المالك") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("atoken", data.token);
          setAtoken(data.token);
          navigate("/dmin-dashbord");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dtoken", data.token);
          setDtoken(data.token);
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] bg-white">
      <form
        dir="rtl"
        onSubmit={onSubmitHandler}
        className="min-h-[80vh] flex items-center "
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto">
            تسجيل دخول <span className="text-[#5f6fff]">{state}</span>
          </p>

          <div className="w-full">
            <p>البريد الألكنروني</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#dadada] rounded w-full p-2 mt-1 "
              type="email"
              required
            />
          </div>

          <div className="w-full">
            <p>كلمة السر</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#dadada] rounded w-full p-2 mt-1"
              type="password"
              required
            />
          </div>
          <button
            className="bg-[#5f6fff] text-white text-base w-full py-2 rounded-md cursor-pointer hover:bg-[#5f6fffbd] transition-all duration-100"
            type="submit"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
          {state === "المالك" ? (
            <p>
              لتسجيل دخول الاطباء؟{" "}
              <span
                className="cursor-pointer underline text-[#5f6fff]"
                onClick={() => setState("طبيب")}
              >
                أضغط هنا
              </span>
            </p>
          ) : (
            <p>
              لي تسجيل دخول المالك؟{" "}
              <span
                className="cursor-pointer underline text-[#5f6fff]"
                onClick={() => setState("المالك")}
              >
                أضغط هنا
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
