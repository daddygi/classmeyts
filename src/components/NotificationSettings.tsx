import React from "react";
import Switch from "@mui/material/Switch";

function NotificationSettings() {
  return (
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
}

export default NotificationSettings;
