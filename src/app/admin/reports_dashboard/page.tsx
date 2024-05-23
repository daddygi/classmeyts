"use client"
import React, { useState, useEffect } from "react"; 
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";
import SearchBar from "@/components/SearchComponent";
import BasicTable from "../_component/Table";
const Reports_Dashboard = () => {
    return (
    <div className="h-100% flex">
      <div className="xl:w-20 h-screen">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow p-12">
        <PageTitle title="User Logs" />
        <SearchBar />
        <div className="mt-12">
          <BasicTable title="Recent Modules" />
        </div>
        <div className="mt-12">
          <BasicTable title="Recent Questions" />
        </div>
        <div className="mt-12">
          <BasicTable title="Recent Comments" />
        </div>
      </div>
    </div>
    );
}
export default Reports_Dashboard;