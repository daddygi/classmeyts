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
import { signInSchema } from "../../../../schemas";
import { signInUser } from "../../../../actions/signIn";
import FormError from "@/components/Form-error";
import FormSuccess from "@/components/Form-success";

const baloo = Baloo_2({ subsets: ["latin"] });
function SignInForm() {
  type FormData = z.infer<typeof signInSchema>;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (data: FormData) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      signInUser(data).then((data) => {
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
      <div className="flex flex-col bg-white w-[684px] h-[591px] items-center p-12">
        <div
          className={cn(
            baloo.className,
            "text-5xl text-text-main-color mb-2 tracking-widest font-extrabold drop-shadow-xl"
          )}
        >
          Welcome!
        </div>
        <div className="mb-12">Sign in to continue</div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-[486px] mb-12"
        >
          <TextField
            label="Username"
            variant="standard"
            className="mb-10"
            {...register("username")}
            disabled={isPending}
          />
          <TextField
            label="Password"
            variant="standard"
            type="password"
            {...register("password")}
            disabled={isPending}
          />
          <div className="text-sm flex justify-end w-full mb-12">
            <Link href="/" className="text-link-color">
              Forgot Password?
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <Button
              variant="contained"
              className="w-[486px] bg-secondary-color-blue text-white"
              type="submit"
            >
              Sign In
            </Button>
            <p>
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-link-color underline">
                Sign up
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

export default SignInForm;
