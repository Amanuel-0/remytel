"use client";
import Card from "@/components/card";
import PhoneInput from "@/components/form/phone-input";
import Textt from "@/components/text";
import TopupOptionDetailCard from "@/components/topup-option-detail-card";
import TopupToDetailCard from "@/components/topup-to-detail-card";
import Button from "@/components/ui/button";
import VerifyOtp from "@/components/verify-otp";
import React from "react";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";

function Verify() {
  return (
    <>
      <Textt variant="h4-craftwork">You’re senRemytel top-up to</Textt>

      <div className="mt-5">
        <TopupToDetailCard />
      </div>

      <div className="mt-5">
        <TopupOptionDetailCard />
      </div>

      <Card className="my-8">
        {/* back button */}
        <button className="mb-6 flex h-8 items-center justify-start gap-2 rounded-full border-2 border-[#E1E1E1] px-5">
          <Image
            src="/assets/icons/arrow-back.svg"
            alt="arrow-left"
            width={5}
            height={6}
          />
          <Textt variant="span1-satoshi">Back</Textt>
        </button>

        <Textt variant="h4-craftwork" className="md:text-start">
          {`Please Enter The Verification Code Sent to:`}
        </Textt>

        <div className="mt-[10px] flex items-center justify-between">
          <Textt
            variant="span1-satoshi"
            className="mb-5 mt-[10px] text-primary"
          >
            +251 93 542 5899
          </Textt>

          <IconButton className="h-8 w-8">
            <Image
              src={"/assets/icons/edit-icon.svg"}
              alt={"edit-icon"}
              width={14}
              height={14}
            />
          </IconButton>
        </div>

        {/* verify opt form */}
        <VerifyOtp />

        <Textt variant="span1-satoshi" className="underline">
          Request new code
        </Textt>
      </Card>
    </>
  );
}

export default Verify;
