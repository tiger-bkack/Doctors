import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";

const Reports = () => {
  const { getAllReportsFromUser, reports, token } = useContext(AppContext);

  useEffect(() => {
    if (token) getAllReportsFromUser();
  }, [token]);
  return <div>Reports</div>;
};

export default Reports;
