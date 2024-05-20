"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import Switch from "@mui/material/Switch";
import { TextField, Button } from "@mui/material";
import Link from "next/link";

// Components for different settings
const NotificationSettings = () => (
  <div className="flex flex-col gap-12">
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-secondary-color-blue">
        Notification Settings
      </h2>
      <p className="text-secondary-color-blue">
        Stay in control of your notifications with our easy-to-use settings.
        Customize alters to suit your preference and never miss an important
        update again!
      </p>
    </div>

    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-4">
        <p className="font-bold">In Application Notification</p>
        <Switch defaultChecked disabled color="warning" />
      </div>
    </div>
  </div>
);

const ChangePassword = () => (
  <div className="flex flex-col gap-12">
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-secondary-color-blue">
        Change Password
      </h2>
      <p className="text-secondary-color-blue">
        Update your password to keep your account secure. Choose a new password
        to <br /> ensure your online safety.
      </p>
    </div>

    <div className="flex flex-col justify-center items-center gap-4">
      <TextField
        id="outlined-basic"
        label="Current Password"
        variant="outlined"
        className="w-[572px]"
      />
      <TextField
        id="outlined-basic"
        label="New Password"
        variant="outlined"
        className="w-[572px]"
      />
      <TextField
        id="outlined-basic"
        label="Re-type new password"
        variant="outlined"
        className="
      w-[572px]"
      />
      <div
        className="text-sm flex items-center justify-start 
       w-[572px]"
      >
        <Link href="/reset" className="text-link-color">
          Forgot Password?
        </Link>
      </div>
    </div>
    <div className="flex justify-center items-center">
      <Button
        variant="contained"
        className="w-[486px] bg-secondary-color-blue text-white"
        type="submit"
      >
        Change Password
      </Button>
    </div>
  </div>
);

const AccountDeactivation = () => (
  <div className="flex flex-col gap-12">
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-secondary-color-blue">
        Deactivating your Classmeyt account
      </h2>
      <p className="text-secondary-color-blue">
        Are your sure you want to deactivate your account? If you want to take a
        break from <br /> Classmeyt’s, you can temporarily deactivate this
        account.
      </p>
    </div>
  </div>
);

const HelpCenter = () => (
  <div className="flex flex-col gap-12">
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-secondary-color-blue">
        FAQs and Help Center
      </h2>
      <p className="text-secondary-color-blue">
        Need assistance? Explore our FAQs and Help Center for quick answers and
        expert <br /> guidance. Get the support you need, whenever you need it.
      </p>
    </div>
  </div>
);

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
