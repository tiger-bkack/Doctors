import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const { setToken, token, backendUrl } = useContext(AppContext);
  const navgate = useNavigate();

  const [state, setState] = useState("Sign up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loader, setLoader] = useState(false);

  const handleLoginWithGoogle = async (credentialRespones) => {
    try {
      const id_token = credentialRespones.credential;

      const respones = await axios.post(backendUrl + "/api/user/google", {
        id_token,
      });

      if (respones.data.success) {
        localStorage.setItem("token", respones.data.token);
        setToken(respones.data.token);
        navgate("/");
      } else {
        toast.error(respones.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("فشل تسحيل الدخول عبر جوجل");
    }
  };

  const handelSubmitForm = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      switch (state) {
        case "Sign up": {
          const response = await axios.post(`${backendUrl}/api/user/register`, {
            name,
            email,
            password,
          });
          const registerData = response.data;

          if (registerData.success) {
            localStorage.setItem("token", registerData.token);
            setToken(registerData.token);
            setState("Login");
          } else {
            toast.error(registerData.message);
          }
          break;
        }

        case "Login": {
          const response = await axios.post(`${backendUrl}/api/user/login`, {
            email,
            password,
          });
          const loginData = response.data;

          if (loginData.success) {
            localStorage.setItem("token", loginData.token);
            setToken(loginData.token);
            navgate("/");
          } else {
            toast.error(loginData.message);
          }
          break;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء الاتصال بالسيرفر");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (token) {
      navgate("/");
    }
  }, [token]);
  return (
    <form
      onSubmit={handelSubmitForm}
      dir="rtl"
      className="my-20 flex items-center justify-center "
    >
      <div className="flex flex-col gap-3 items-start p-8 min-w-[340px] sm:min-w-96 border rounded-2xl border-gray-400 bg-white ">
        <p className="text-2xl font-semibold">
          {state === "Sign up" ? "إنشاء حساب" : "تسجيل الدخول"}
        </p>
        <p>
          {state === "Sign up"
            ? "برجاء إنشاء حساب لحجز الموعد"
            : "من فضلك سجّل الدخول لحجز الموعد"}
        </p>
        {state === "Sign up" && (
          <div className="w-full">
            <p>الاسم بالكامل :</p>
            <input
              type="text"
              name="name"
              value={name}
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        )}
        <div className="w-full">
          <p>البريد الإلكتروني :</p>
          <input
            type="email"
            name="email"
            value={email}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="w-full">
          <p>كلمة المرور :</p>
          <input
            type="password"
            name="password"
            value={password}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-[#5f6fff] text-white w-full rounded-3xl text-base py-2 cursor-pointer hover:bg-[#5f6fffc2] transition-all duration-200"
        >
          {state === "Sign up"
            ? loader
              ? "جاري أنشاء الحساب..."
              : "أنشاء الحساب"
            : loader
            ? "جاي التجيل الدخول..."
            : "تسجيل الدخول"}
        </button>

        <GoogleLogin
          size="large"
          width={"320px"}
          shape="circle"
          onSuccess={(credentialRespones) =>
            handleLoginWithGoogle(credentialRespones)
          }
          onError={() => toast.error("فشل تسجيل الدخول عبر جوجل")}
        />

        {state === "Sign up" ? (
          <p className="text-sm">
            لديك حساب بالفعل؟{" "}
            <span
              className="text-[#015aff] cursor-pointer underline"
              onClick={() => setState("Login")}
            >
              سجّل الدخول من هنا
            </span>
          </p>
        ) : (
          <p className="text-sm">
            ليس لديك حساب؟{" "}
            <span
              className="text-[#015aff] cursor-pointer underline"
              onClick={() => setState("Sign up")}
            >
              أنشئ حساب جديد
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
