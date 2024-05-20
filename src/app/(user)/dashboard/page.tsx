//@ts-nocheck
"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";
import Cards from "@/components/Cards";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

const DashboardPage = () => {
  const user = useCurrentUser();
  // console.log("This is session.user", session?.user);
  const onClick = () => {
    signOut();
  };

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
          {JSON.stringify(user.studentNumber)}
          <Cards />
        </div>

        <button onClick={onClick}>Sign Out</button>
      </div>
    </div>
  );
};

export default DashboardPage;
