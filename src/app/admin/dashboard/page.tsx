//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import AdminSideBar from "../_component/AdminSideBar";
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
    <div className="h-screens flex">
      <div className="xl:w-20 h-screen">
        <AdminSideBar />
      </div>
      <div className="p-7 flex flex-col flex-grow">
        <div className="flex  ">
          <PageTitle title="Dashboard" />
          <div className="ml-24 flex gap-12  justify-center">
            <PageTitle title="Create College Block" />
            <div className="justify-center align-center">
              <CreateCDTemplate />
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          <div className="p-12 flex flex-col gap-12">
            <PageTitle title="College Block" />
            <div className="flex-grow flex justify-center items-center">
              <div className="">
                <Card
                  title={"All College Blocks"}
                  data={{ ...collegeBlocks }}
                />
              </div>
            </div>
          </div>

          <div className="p-12 flex flex-col gap-12 justify-center items-center">
            <PageTitle title="Department Block" />
            <div className="flex-grow flex justify-center items-center">
              <div className="">
                <div
                  className="col-span-2 items-center flex justify-center"
                  data={{ key1: "hello", key2: "world" }}
                  s
                >
                  <Card
                    title={"All Department Blocks"}
                    width="w-full"
                    height="h-[550px]"
                    data={{ ...departmentBlocks }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
