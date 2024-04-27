import React from "react";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/ui/PageTitle";

function DashboardPage() {
  return (
    <div className="h-full flex">
      <div className="xl:w-20 xl:h-full ">
        <Sidebar />
      </div>
      <div className="">
        <PageTitle title="Dashboard" />
      </div>
    </div>
  );
}

export default DashboardPage;
