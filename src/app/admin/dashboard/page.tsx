//@ts-nocheck
"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";
import SearchBar from "@/components/SearchComponent";
import Card from "../_component/Card";

const DashboardPage = () => {
  return (
    <div className="h-full flex">
      <div className="xl:w-20 xl:h-full">
        <Sidebar />
      </div>
      <div className="p-12 flex flex-col flex-grow">
        <PageTitle title="Dashboard" />
        <SearchBar />
        <div className="p-12 flex flex-col gap-12">
          <PageTitle title="College Block" />
          <div className="flex-grow flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
              <Card title="Trending College Blocks" />
              <Card title="Most Recent Activity" />
              <Card title="All College Blocks" />
            </div>
          </div>
        </div>

        <div className="p-12 flex flex-col gap-12">
          <PageTitle title="Department Block" />
          <div className="flex-grow flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
              {/* Column 1: Two stacked cards */}
              <div className="grid grid-rows-2 gap-4">
                <Card title="Department 1" />
                <Card title="Department 2" />
              </div>
              {/* Column 2 and 3: One large card spanning two columns */}
              <div className="col-span-2">
                <Card
                  title="Large Department Card"
                  width="w-full"
                  height="h-[810px]" // Example height for a larger card
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
