import React, { useState, useTransition } from "react";
import { TextField, Button } from "@mui/material";
import { SettingsChangePasswordSchema } from "../../schemas";
import { settingsChangePassword } from "../../actions/settings-change-password";
import FormError from "@/components/Form-error";
import FormSuccess from "@/components/Form-success";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

function ChangePassword() {
  type FormData = z.infer<typeof SettingsChangePasswordSchema>;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(SettingsChangePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      retypeNewPassword: "",
    },
  });

  const onSubmit = (data: FormData) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      settingsChangePassword(data).then((data) => {
        if (data?.error) {
          setError(data.error);
        } else {
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-secondary-color-blue">
          Change Password
        </h2>
        <p className="text-secondary-color-blue">
          Update your password to keep your account secure. Choose a new
          password to <br /> ensure your online safety.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <TextField
            id="outlined-basic"
            label="Current Password"
            variant="outlined"
            className="w-[572px]"
            type="password"
            {...register("password")}
            disabled={isPending}
          />
          <TextField
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            className="w-[572px]"
            type="password"
            {...register("newPassword")}
            disabled={isPending}
          />
          <TextField
            id="outlined-basic"
            label="Re-type new password"
            variant="outlined"
            className="w-[572px]"
            type="password"
            {...register("retypeNewPassword")}
            disabled={isPending}
          />
        </div>
        <div className="flex justify-center items-center">
          <Button
            variant="contained"
            className="w-[486px] bg-secondary-color-blue text-white"
            type="submit"
            disabled={isPending}
          >
            Change Password
          </Button>
        </div>
      </form>
      <div className="p-4">
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </div>
  );
}

export default ChangePassword;
