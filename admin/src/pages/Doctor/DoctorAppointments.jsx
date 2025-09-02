import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { Button, Modal, Spinner, Dropdown, DropdownItem } from "flowbite-react";
import AddReport from "../../components/Reports/AddReport";
import ViewModel from "../../components/Reports/ViewModel";
import AddConsaltation from "../../components/consultations/AddConsaltation";

function DoctorAppointments() {
  const [openModal, setOpenModal] = useState(false);
  const [openViewReportModel, setOpenViewReportModel] = useState(false);
  const [openAddConsualtationModel, setOpenAddConsualtationModel] =
    useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedConsaltation, setSelectedConsaltation] = useState(null);

  const {
    getAppointments,
    appointment,
    dtoken,
    cancelAppointment,
    completeAppointment,
    docInfo,
    getDoctorProfile,
    getDoctorDashbord,
    getConsultation,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  // Loader منفصل لكل زرار
  const [loadingActions, setLoadingActions] = useState({});

  useEffect(() => {
    if (dtoken) {
      getAppointments();
      getDoctorDashbord();
      getDoctorProfile();
      getConsultation();
    }
  }, [dtoken]);

  const handleCompleteAppointment = async (id) => {
    setLoadingActions((prev) => ({ ...prev, [id]: true }));
    await completeAppointment(id);
    setLoadingActions((prev) => ({ ...prev, [id]: false }));
  };

  const handleCancelAppointment = async (id) => {
    setLoadingActions((prev) => ({ ...prev, [id]: true }));
    await cancelAppointment(id);
    setLoadingActions((prev) => ({ ...prev, [id]: false }));
  };

  const handleOpenModal = (items) => {
    setSelectedAppointment(items);
    setOpenModal(true);
  };

  const handleOpenViweModel = (items) => {
    setSelectedReport(items);
    setOpenViewReportModel(true);
  };

  const handleOpenConsualationModel = (appointment) => {
    setSelectedConsaltation(appointment);
    setOpenAddConsualtationModel(true);
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 font-medium text-lg">{`كل الحجوزات الخاصه بي ${docInfo.name}`}</p>

      <div className="bg-white border border-gray-200 text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll rounded-2xl">
        <div className="max-sm:hidden grid grid-cols-[0.3fr_1fr_0.5fr_0.4fr_2fr_0.5fr_1fr_0.2fr] gap-1 py-3 px-6 border-b border-gray-200">
          <p className="hidden md:block">#</p>
          <p>المريض</p>
          <p>حاله الدفع</p>
          <p>العمر</p>
          <p className="hidden md:block">الوقت & التاريخ</p>
          <p>سعر الكشف</p>
          <div className="w-full flex items-center justify-center">
            <p>الحالة</p>
          </div>
        </div>

        {appointment.map((items, index) => (
          <div
            key={items._id}
            className="flex flex-wrap justify-between  text-base sm:grid grid-cols-[0.3fr_1fr_0.5fr_0.4fr_2fr_0.5fr_1fr_0.2fr] gap-1 items-center py-3 px-6   border-b border-gray-200 text-gray-500 hover:bg-gray-50 transition-all duration-150"
          >
            <p className="hidden md:block">{index + 1}</p>
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full"
                src={items.userData.image}
                alt={items.userData.name}
              />
              <p>{items.userData.name}</p>
            </div>

            <div>
              <p
                className={`text-xs inline border ${
                  items.payment ? "border-[#5f6fff]" : "border-[#ff8c6f]"
                } px-2 rounded-full`}
              >
                {items.payment ? "أون لاين" : "كاش"}
              </p>
            </div>

            <p className="hidden md:block">
              {calculateAge(items.userData.dob)}
            </p>
            <p>
              {slotDateFormat(items.slotDate)} , {items.slotTime}
            </p>
            <p>
              {items.amount} {currency}
            </p>
            <div className="flex items-center justify-center">
              {items.cancelled ? (
                <p className="text-red-400 font-medium text-sm">
                  تم ألغاء الكشف
                </p>
              ) : items.isCompleted ? (
                <p className="text-green-500 text-sm font-medium">تم الكشف</p>
              ) : (
                <div className="flex gap-0.5 ">
                  {loadingActions[items._id] ? (
                    <p className="flex items-center gap-2">
                      <span>جاري التنفيذ...</span>
                      <Spinner aria-label="Default status example" size="md" />
                    </p>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-2">
                      <img
                        onClick={() => handleCancelAppointment(items._id)}
                        className="w-10 cursor-pointer"
                        src={assets.cancel_icon}
                        alt="cancel"
                      />
                      <img
                        onClick={() => handleCompleteAppointment(items._id)}
                        className="w-10 cursor-pointer"
                        src={assets.tick_icon}
                        alt="complete"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="">
              <Dropdown
                inline
                className="px-3 py-3 !bg-gray-200 rounded-2xl drop-shadow-2xl "
              >
                <DropdownItem
                  className="hover:bg-white hover:rounded-2xl transition-all ease-in duration-100"
                  onClick={() => handleOpenModal(items)}
                >
                  أضافه تقرير
                </DropdownItem>
                <DropdownItem
                  className="hover:bg-white hover:rounded-2xl transition-all ease-in duration-100"
                  onClick={() => handleOpenViweModel(items)}
                >
                  عرض التقارير
                </DropdownItem>
                <DropdownItem
                  className="hover:bg-white hover:rounded-2xl transition-all ease-in duration-100"
                  onClick={() => handleOpenConsualationModel(items)}
                >
                  تحديد أستشارة
                </DropdownItem>
              </Dropdown>
            </div>
          </div>
        ))}
      </div>

      <Modal size="5xl" show={openModal} onClose={() => setOpenModal(false)}>
        {selectedAppointment && (
          <AddReport
            setOpenModal={setOpenModal}
            appointmentId={selectedAppointment._id}
            items={selectedAppointment}
          />
        )}
      </Modal>

      <Modal
        size="6xl"
        show={openViewReportModel}
        onClose={() => setOpenViewReportModel(false)}
      >
        {selectedReport && (
          <ViewModel
            setOpenViewReportModel={setOpenViewReportModel}
            items={selectedReport}
          />
        )}
      </Modal>

      <Modal
        size="lg"
        show={openAddConsualtationModel}
        onClose={() => setOpenAddConsualtationModel(false)}
      >
        {selectedConsaltation && (
          <AddConsaltation
            setOpenAddConsualtationModel={setOpenAddConsualtationModel}
            items={selectedConsaltation}
          />
        )}
      </Modal>
    </div>
  );
}

export default DoctorAppointments;
