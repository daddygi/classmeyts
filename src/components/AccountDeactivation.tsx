import React from "react";

function AccountDeactivation() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-secondary-color-blue">
          Deactivating your Classmeyt account
        </h2>
        <p className="text-secondary-color-blue">
          Are your sure you want to deactivate your account? If you want to take
          a break from <br /> Classmeyt’s, you can temporarily deactivate this
          account.
        </p>
      </div>
    </div>
  );
}

export default AccountDeactivation;
