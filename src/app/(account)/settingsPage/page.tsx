//@ts-nocheck
"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";

const SettingsPage = () => {
  return (
    <div className="h-full flex">
      <div className="xl:w-20 xl:h-full ">
        <Sidebar />
      </div>
      <div className="p-12 flex-col">
        <PageTitle title="Settings & Privacy" />
      </div>
    </div>
  );
};

export default SettingsPage;
