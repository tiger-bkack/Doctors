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
  const value = {
    calculateAge,
    slotDateFormat,
    currency,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
