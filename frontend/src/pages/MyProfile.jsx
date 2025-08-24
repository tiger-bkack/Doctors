import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { userData, setUserData, loadUserProfileData, token, backendUrl } =
    useContext(AppContext);
  const navgate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loader, setLoader] = useState(false);

  const upadteUserProfileInfo = async () => {
    try {
      setLoader(true);

      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append("nationaliId", userData.nationaliId);
      formData.append("nationality", userData.nationality);
      formData.append("address", JSON.stringify(userData.address));
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-ptofile",
        formData,
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
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
  return userData ? (
    <div dir="rtl" className="">
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer ">
              <img
                className="w-36 opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              hidden
              id="image"
            />
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="" />
        )}

        {isEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}
        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div className="">
          <p className="text-neutral-500 underline mt-3">معلومات الاتصال</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700">
            <p className="font-medium">البريد الألكتروني :</p>
            <p className="text-blue-500">{userData.email}</p>
            <p className="font-medium">رقم الهاتف :</p>
            {isEdit ? (
              <input
                className="bg-gray-100 max-w-52"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}
            <p className="font-medium">العنوان :</p>
            {isEdit ? (
              <p>
                <input
                  className="bg-gray-50"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                />
                <br />
                <input
                  className="bg-gray-50"
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                />
              </p>
            ) : (
              <>
                <p className="text-gary-500">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="">
          <div className="">
            <p className="text-neutral-500 underline mt-3">
              المعلومات الأساسية
            </p>
            <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700">
              <p className="font-medium">الرقم القومي:</p>
              {isEdit ? (
                <input
                  className="bg-gray-100 max-w-52"
                  type="text"
                  value={userData.nationaliId}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      nationaliId: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-gray-400">{userData.nationaliId}</p>
              )}

              <p className="font-medium">الجنسية:</p>
              {isEdit ? (
                <input
                  className="bg-gray-100 max-w-52"
                  type="text"
                  value={userData.nationality}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      nationality: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-gray-400">{userData.nationality}</p>
              )}

              <p className="font-medium">النوع :</p>
              {isEdit ? (
                <select
                  className="max-w-20 bg-gray-100"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  value={userData.gender}
                >
                  <option value="ذكر">ذكر </option>
                  <option value="أنثي">أنثي</option>
                </select>
              ) : (
                <p className="text-gray-400">{userData.gender}</p>
              )}
              <p className="font-medium">تاريخ الميلاد :</p>
              {isEdit ? (
                <input
                  className="max-w-28 bg-gray-100"
                  type="date"
                  value={userData.dob ? userData.dob.split("T")[0] : ""}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <p className="text-gray-400">
                  {userData.dob ? userData.dob.split("T")[0] : "N/A"}
                </p>
              )}
            </div>
          </div>
          <div className="my-10">
            {isEdit ? (
              <button
                className="border border-[#5f6fff] px-8 py-2 rounded-full hover:bg-[#5f6fff] hover:text-white transition-all duration-100"
                onClick={() => upadteUserProfileInfo()}
              >
                {loader ? "جاري تحف البيانات..." : "حفظ المعلومات"}
              </button>
            ) : (
              <button
                className="border border-[#5f6fff] px-8 py-2 rounded-full hover:bg-[#5f6fff] hover:text-white transition-all duration-100"
                onClick={() => setIsEdit(true)}
              >
                تعدبل الملف الشخصي
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    navgate("/")
  );
};

export default MyProfile;
