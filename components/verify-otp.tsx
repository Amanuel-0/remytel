"use client";
import React, { useContext, useEffect } from "react";
import OtpInput from "./form/otp-input";
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/services";
import authContext from "@/states/auth-context";
import userContext from "@/states/user-context";
import { User } from "@/models";

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

  const handleSubmit = async (pin: string) => {
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
      navigate.push(redirectUrl);
    } else {
      navigate.push(redirectUrlIncompleteProfile);
    }
  };

  return (
    <form className="my-6">
      <OtpInput onComplete={handleSubmit} />
    </form>
  );
}

export default VerifyOtp;
