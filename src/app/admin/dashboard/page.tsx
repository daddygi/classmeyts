//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";
import SearchBar from "@/components/SearchComponent";
import Card from "../_component/Card";
import CreateCDTemplate from "../_component/CreateCDTemplate";
import {
  get_all_college_blocks,
  get_all_department_blocks,
} from "../../../../data/college_dept_block";
const DashboardPage = () => {
  const [collegeBlocks, setCollegeBlocks] = useState([]);
  const [departmentBlocks, setDepartmentBlocks] = useState([]);

  useEffect(() => {
    const fetchCollegeBlocks = async () => {
      try {
        const response = await fetch("/api/college_dept");
        const dataCollege = await response.json(); // Extract JSON data from the response
        console.log(JSON.stringify(dataCollege));
        const collegeNames = dataCollege.map((block) => block.collegeName);
        setCollegeBlocks(dataCollege);
      } catch (error) {
        console.error("Error fetching college blocks:", error);
      }
    };

    const fetchDepartmentBlocks = async () => {
      try {
        // Fetch department blocks from the server-side API
        const response = await fetch("/api/dept");
        const dataDept = await response.json();
        console.log("dept");
        console.log(JSON.stringify(dataDept));
        const DepartmentName = dataDept.map((block) => block.department); // Fix here
        setDepartmentBlocks(dataDept);
      } catch (error) {
        console.error("Error fetching department blocks:", error);
      }
    };

    fetchCollegeBlocks();
    fetchDepartmentBlocks();
  }, []);

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
              <Card
                title="Trending College Blocks"
                data={{ key1: "hello", key2: "world" }}
              />
              <Card
                title="Most Recent Activity"
                data={{ key1: "hello", key2: "world" }}
              />
              <Card title={"All College Blocks"} data={{ ...collegeBlocks }} />
            </div>
          </div>
        </div>

        <div className="p-12 flex flex-col gap-12">
          <PageTitle title="Department Block" />
          <div className="flex-grow flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
              <div className="grid grid-rows-2 gap-4">
                <Card
                  title="Department 1"
                  data={{ key1: "hello", key2: "world" }}
                />
                <Card
                  title="Department 2"
                  data={{ key1: "hello", key2: "world" }}
                />
              </div>
              <div
                className="col-span-2"
                data={{ key1: "hello", key2: "world" }}
                s
              >
                <Card
                  title={"All Department Blocks"}
                  width="w-full"
                  height="h-[810px]"
                  data={{ ...departmentBlocks }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-12 flex flex-col gap-12">
          <PageTitle title="Create College Block" />
          <CreateCDTemplate />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
