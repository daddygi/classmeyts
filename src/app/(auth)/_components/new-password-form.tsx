"use client";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { TextField, Button } from "@mui/material";
import Link from "next/link";
import { Baloo_2 } from "next/font/google";
import { cn } from "@/utils/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NewPasswordSchema } from "../../../../schemas";
import { newPassword } from "../../../../actions/new-password";
import FormError from "@/components/Form-error";
import FormSuccess from "@/components/Form-success";
import { useSearchParams } from "next/navigation";

const baloo = Baloo_2({ subsets: ["latin"] });
function NewPasswordForm() {
  type FormData = z.infer<typeof NewPasswordSchema>;
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = (data: FormData) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(data, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-sign-in-first-color to-sign-in-last-color ">
      <div className="flex flex-col bg-main-color-blue w-[350px] h-[591px] p-8  items-center gap-4 ">
        <div>
          <Image src="/logo-no-bg.png" alt="" width={273} height={253} />
        </div>
        <div className="text-sm text-center">
          At Classmeyt's, we're committed on enhancing your academic journey by
          providing a vibrant online community where students can share
          resources, engage in discussions, and receive valuable peer feedback.
        </div>
      </div>
      <div className="flex flex-col bg-white w-[684px] h-[591px] items-center p-12 gap-4">
        <div
          className={cn(
            baloo.className,
            "text-4xl text-text-main-color mb-2 tracking-widest font-extrabold drop-shadow-xl"
          )}
        >
          Enter a new password
        </div>
        <div className="mb-12">Reset password</div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-[486px] mb-12"
        >
          <TextField
            label="Password"
            variant="standard"
            className="mb-10"
            type="password"
            {...register("password")}
            disabled={isPending}
          />

          <div className="flex flex-col justify-center items-center gap-4">
            <Button
              variant="contained"
              className="w-[486px] bg-secondary-color-blue text-white"
              type="submit"
            >
              Reset Password
            </Button>
            <p>
              <Link href="/sign-in" className="text-link-color underline">
                Back to Sign In
              </Link>
            </p>
          </div>
          <div className="p-4">
            <FormSuccess message={success} />
            <FormError message={error} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPasswordForm;
