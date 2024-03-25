"use client";
import React from "react";
import OtpInput from "./form/otp-input";
import { useRouter } from "next/navigation";

function VerifyOtp() {
  const navigate = useRouter();
  // handle OTP Submit
  const handleSubmit = (pin: string) => {
    // handle api request here but I'm console logging it
    console.log(pin);
    navigate.push("/send-topup/bill");
  };

  return (
    <form className="my-6">
      <OtpInput onComplete={handleSubmit} />
      {/* <PhoneInput className="my-[10px]" /> */}
    </form>
  );
}

export default VerifyOtp;
