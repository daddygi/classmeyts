import React from "react";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";

function ProfilePage() {
  return (
    <div className="h-full flex">
      <div className="xl:w-20 xl:h-full ">
        <Sidebar />
      </div>
      <div className="">
        <PageTitle title="Profile" />
      </div>
    </div>
  );
}

export default ProfilePage;
