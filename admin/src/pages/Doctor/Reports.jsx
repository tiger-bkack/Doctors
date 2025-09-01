import { TabItem, Tabs } from "flowbite-react";

import { HiAdjustments, HiClipboardList } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import AllReports from "../../components/Reports/AllReports";
import UserReportWithDoctor from "../../components/Reports/UserReportWithDoctor";

const Reports = () => {
  return (
    <div className="w-full max-w-6xl m-5">
      <div className="bg-white border border-gray-200 px-2 text-sm max-h-[100vh] min-h-[95vh] overflow-y-scroll">
        <Tabs aria-label="Tabs with icons" variant="underline">
          <TabItem active title="كل التقارير" icon={HiClipboardList}>
            <AllReports className="shadow-2xl" />
          </TabItem>
          <TabItem title=" البحث عن تقرير" icon={CiSearch}>
            <UserReportWithDoctor />
          </TabItem>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
