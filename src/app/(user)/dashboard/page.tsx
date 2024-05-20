//@ts-nocheck
"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";
import Cards from "@/components/Cards";

const DashboardPage = () => {
  return (
    <div className="h-full flex">
      <div className="xl:w-20 xl:h-full ">
        <Sidebar />
      </div>
      <div className="p-12">
        <PageTitle title="Dashboard" />
        <div></div>
        <div></div>
        <div>
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
