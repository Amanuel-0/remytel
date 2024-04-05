"use client";
import React, { useContext } from "react";
import OtpInput from "./form/otp-input";
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/services";
import authContext from "@/states/auth-context";
import userContext from "@/states/user-context";

interface VerifyOtpProps {
  redirectUrl: string;
  senderPhoneNumber: string;
  code: string;
}
function VerifyOtp({ redirectUrl, senderPhoneNumber, code }: VerifyOtpProps) {
  const { isLoggedIn, onLogin } = useContext(authContext);
  const { user, onUser } = useContext(userContext);
  const navigate = useRouter();

  const handleSubmit = async (pin: string) => {
    // for now, just for testing
    // navigate.push(redirectUrl);
    // return;

    const otpResponse = await verifyOtp({
      otp: pin,
      phoneNumber: senderPhoneNumber,
      code: code,
    });

    if (otpResponse.error) {
      console.log(otpResponse.error);
      return;
    }

    // update auth & user context
    onLogin(true);
    onUser(otpResponse);
    // store auth & user to local storage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(otpResponse));

    navigate.push(redirectUrl);
  };

  return (
    <form className="my-6">
      <OtpInput onComplete={handleSubmit} />
    </form>
  );
}

export default VerifyOtp;
