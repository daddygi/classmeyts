"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";
import Image from "next/image";

const SettingsPage = () => {
  return (
    <div className="h-full flex">
      <div className="xl:w-20 xl:h-full ">
        <Sidebar />
      </div>
      <div className="p-12 flex-col h-full w-full">
        <PageTitle title="Settings & Privacy" />
        <div className="flex justify-center items-center gap-10 pt-5">
          <div className="flex flex-col bg-white w-1/3 h-[752px] p-8  gap-4 rounded-lg">
            <h1 className="border-b-2">Preference</h1>
            <div className="flex">
              <Image
                src="/notifications.png"
                alt="notification"
                width={25}
                height={25}
              />
              <p>Notification</p>
            </div>
            <h1 className="border-b-2">Account Center</h1>
            <div className="flex">
              <Image
                src="/encrypted.png"
                alt="notification"
                width={20}
                height={20}
              />
              <p>Change Password</p>
            </div>
            <div className="flex">
              <Image
                src="/account_circle_off.png"
                alt="notification"
                width={25}
                height={25}
              />
              <p>Acount Deactivation</p>
            </div>
            <h1 className="border-b-2">Help</h1>
            <div className="flex">
              <Image
                src="/info.png"
                alt="notification"
                width={20}
                height={20}
              />
              <p>FAQS and Help Center</p>
            </div>
          </div>
          <div className="flex flex-col bg-white w-2/3 h-[752px] p-8 items-center gap-4 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
