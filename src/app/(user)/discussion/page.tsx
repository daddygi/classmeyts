import React from "react";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";

function DiscussionPage() {
  return (
    <div className="h-full flex">
      <div className="xl:w-20 xl:h-full ">
        <Sidebar />
      </div>
      <div className="">
        <PageTitle title="Discussion" />
      </div>
    </div>
  );
}

export default DiscussionPage;
