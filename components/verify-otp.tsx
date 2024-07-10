"use client";
import React, { useContext, useEffect, useState } from "react";
import OtpInput from "./form/otp-input";
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/services";
import authContext from "@/states/auth-context";
import userContext from "@/states/user-context";
import { User } from "@/models";
import { toast } from "sonner";
import MyButton from "./ui/my-button";
import { LoadingSpinner } from "./loading-spinner";

interface VerifyOtpProps {
  redirectUrl: string;
  phoneNumber: string;
  code: string;
  redirectUrlIncompleteProfile?: string;
}
function VerifyOtp({
  redirectUrl,
  phoneNumber,
  code,
  redirectUrlIncompleteProfile,
}: VerifyOtpProps) {
  if (!redirectUrlIncompleteProfile) redirectUrlIncompleteProfile = redirectUrl;
  const { onLogin } = useContext(authContext);
  const { onUser } = useContext(userContext);
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (pin: string) => {
    try {
      setLoading(true);
      const otpResponse = await verifyOtp({
        otp: pin,
        phoneNumber: phoneNumber,
        code: code,
      });

      if (otpResponse && otpResponse.user && otpResponse.token) {
        // update auth & user context
        onLogin(true);
        onUser({ ...otpResponse } as User);
      }

      console.log("returning to", redirectUrl);
      if (
        otpResponse?.user?.firstName ||
        otpResponse?.user?.lastName ||
        otpResponse?.user?.email
      ) {
        navigate.replace(redirectUrl);
      } else {
        navigate.replace(redirectUrlIncompleteProfile);
      }
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      toast.error(
        <p className="text-red-700">
          {e?.response?.data?.message || "Unknown error while verifying OTP."}
        </p>,
      );
    }
  };

  return (
    <form className={`my-6 flex flex-col gap-6`}>
      {loading && <LoadingSpinner text="Verifying" className="" />}
      <div
        className={`${loading && "pointer-events-none animate-pulse opacity-80"}`}
      >
        <OtpInput onComplete={handleSubmit} />
      </div>
    </form>
  );
}

export default VerifyOtp;
