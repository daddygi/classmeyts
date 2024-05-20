"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";
import Image from "next/image";

import NotificationSettings from "@/components/NotificationSettings";
import ChangePassword from "@/components/ChangePassword";
import HelpCenter from "@/components/HelpCenter";
import AccountDeactivation from "@/components/AccountDeactivation";

// Components for different settings

const SettingsPage = () => {
  const [activeSetting, setActiveSetting] = useState("Notification");

  const renderSettingsContent = () => {
    switch (activeSetting) {
      case "Notification":
        return <NotificationSettings />;
      case "ChangePassword":
        return <ChangePassword />;
      case "AccountDeactivation":
        return <AccountDeactivation />;
      case "HelpCenter":
        return <HelpCenter />;
      default:
        return <NotificationSettings />;
    }
  };

  const getButtonStyle = (setting: string) => {
    return activeSetting === setting ? "bg-background-light-blue" : "bg-white";
  };

  return (
    <div className="h-full flex">
      <div className="w-20 h-full">
        <Sidebar />
      </div>
      <div className="p-12 flex-col h-full w-full">
        <PageTitle title="Settings & Privacy" />
        <div className="flex justify-center items-center gap-10 pt-5">
          <div className="flex flex-col bg-white w-1/3 h-[752px] p-8 gap-6 rounded-lg">
            <h1 className="border-b-2 text-xl text-secondary-color-blue">
              Preference
            </h1>
            <button
              className={`flex w-full p-3 gap-4 rounded-lg transition-colors duration-300 ${getButtonStyle(
                "Notification"
              )}`}
              onClick={() => setActiveSetting("Notification")}
            >
              <Image
                src="/notifications.png"
                alt="notification"
                width={25}
                height={25}
              />
              <p className="font-bold">Notification</p>
            </button>
            <h1 className="border-b-2 text-xl text-secondary-color-blue">
              Account Center
            </h1>
            <button
              className={`flex w-full p-3 gap-4 rounded-lg transition-colors duration-300 ${getButtonStyle(
                "ChangePassword"
              )}`}
              onClick={() => setActiveSetting("ChangePassword")}
            >
              <Image
                src="/encrypted.png"
                alt="change password"
                width={20}
                height={20}
              />
              <p className="font-bold">Change Password</p>
            </button>
            <button
              className={`flex w-full p-3 gap-4 rounded-lg transition-colors duration-300 ${getButtonStyle(
                "AccountDeactivation"
              )}`}
              onClick={() => setActiveSetting("AccountDeactivation")}
            >
              <Image
                src="/account_circle_off.png"
                alt="account deactivation"
                width={25}
                height={25}
              />
              <p className="font-bold">Account Deactivation</p>
            </button>
            <h1 className="border-b-2 text-xl text-secondary-color-blue">
              Help
            </h1>
            <button
              className={`flex w-full p-3 gap-4 rounded-lg transition-colors duration-300 ${getButtonStyle(
                "HelpCenter"
              )}`}
              onClick={() => setActiveSetting("HelpCenter")}
            >
              <Image src="/info.png" alt="help center" width={20} height={20} />
              <p className="font-bold">FAQs and Help Center</p>
            </button>
          </div>
          <div className="flex flex-col bg-white w-2/3 h-[752px] p-8 gap-4 rounded-lg">
            {renderSettingsContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
