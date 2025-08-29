import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "جنية";

  const calculateAge = (dob) => {
    const today = new Date();
    const birDate = new Date(dob);

    let age = today.getFullYear() - birDate.getFullYear();
    return age;
  };
  const month = [
    "",
    "يناير",
    "فبراير",
    "مارس",
    "إبريل",
    "مايو",
    "يونو",
    "يليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + month[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const to12HourFormat = (hour) => {
    hour = Number(hour);
    let period = hour >= 12 ? "بالليل" : "الصبح";
    let adjustedHour = hour % 12;
    adjustedHour = adjustedHour === 0 ? 12 : adjustedHour;
    return `${adjustedHour} ${period}`;
  };

  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  }
  const value = {
    calculateAge,
    slotDateFormat,
    currency,
    to12HourFormat,
    formatDate,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
