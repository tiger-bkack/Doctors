import { TabItem, Tabs } from "flowbite-react";

import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import AllReports from "./AllReports";
import UserReportWithDoctor from "../../components/UserReportWithDoctor";

const Reports = () => {
  return (
    <div className="w-full max-w-6xl m-5">
      <div className="bg-white border border-gray-200 px-2 text-sm max-h-[100vh] min-h-[95vh] overflow-y-scroll">
        <Tabs aria-label="Tabs with icons" variant="underline">
          <TabItem active title="All Report" icon={HiUserCircle}>
            <AllReports className="shadow-2xl" />
          </TabItem>
          <TabItem title="user Report" icon={MdDashboard}>
            <UserReportWithDoctor />
          </TabItem>
          <TabItem title="Settings" icon={HiAdjustments}>
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Settings tab's associated content
            </span>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </TabItem>
          <TabItem title="Contacts" icon={HiClipboardList}>
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Contacts tab's associated content
            </span>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </TabItem>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
