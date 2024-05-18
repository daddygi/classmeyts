//@ts-nocheck
import React from "react";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";
import Cards from "@/components/Cards";
import { auth, signOut } from "@/auth";

const DashboardPage = async () => {
  const session = await auth();

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
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
