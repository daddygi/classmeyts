"use client";
import { Baloo_2 } from "next/font/google";
import { cn } from "@/utils/utils";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "../../../../actions/new-verification";
import FormError from "@/components/Form-error";
import FormSuccess from "@/components/Form-success";

const baloo = Baloo_2({ subsets: ["latin"] });

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  console.log("This is the token", token);

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing Token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("An error occurred while processing your request.");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-sign-in-first-color to-sign-in-last-color ">
      <div className="flex flex-col bg-white w-[684px] h-[591px] items-center p-12 gap-8">
        <div
          className={cn(
            baloo.className,
            "text-5xl text-text-main-color mb-2 tracking-widest font-extrabold drop-shadow-xl"
          )}
        >
          Welcome!
        </div>
        <div className="mb-24">Confirming your verification</div>
        <div className="flex items-center w-full justify-center">
          {!success && !error && <BeatLoader />}
          <FormSuccess message={success} />
          {!success && <FormError message={error} />}
        </div>
        <Link href="/sign-in" className="mt-40">
          Back to sign-in
        </Link>
      </div>
    </div>
  );
};
