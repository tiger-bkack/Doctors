import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import ReportsView from "../components/ReportsView";
import { Card, Dropdown, DropdownItem } from "flowbite-react";

const Reports = () => {
  const {
    getAllReportsFromUser,
    reports,
    token,
    getUserInfo,
    userInfo,
    userData,
  } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      getAllReportsFromUser();
      getUserInfo();
    }
  }, [token]);

  return (
    <div className="flex justify-between flex-row-reverse">
      {reports.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-center text-2xl text-black">لا توجد تقارير بعد</p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-2xl">
          <ReportsView reports={reports} />
        </div>
      )}
      <div className="flex-1 flex items-center justify-center">
        <Card className=" max-h-[300px] min-h-[300px] max-w-[300px]  min-w-[300px] !bg-[#5f6fff] border-none  drop-shadow-2xl">
          <div className="flex flex-col items-center pb-10">
            <img
              alt="Bonnie image"
              src={userData.image}
              className="w-30 h-30 mb-3 rounded-full shadow-lg"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {userData.name}
            </h5>

            <div className="mt-4 flex gap-5 text-white">
              <div className="flex flex-col items-center gap-2">
                <p>عدد الحجزات </p>
                <p>
                  {userInfo?.userAppointment ? userInfo.userAppointment : "0"}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p>عدد التقارير </p>
                <p>{userInfo?.userReport}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
