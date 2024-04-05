"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import TopupOptionDetailCard from "@/components/topup-option-detail-card";
import TopupToDetailCard from "@/components/topup-to-detail-card";
import IconButton from "@/components/ui/icon-button";
import VerifyOtp from "@/components/verify-otp";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function Verify() {
  const searchParams = useSearchParams();
  const senderPhone = searchParams.get("from") ?? "";

  return (
    <>
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
            {senderPhone}
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
        <VerifyOtp
          redirectUrl="/request-topup/create-topup-link"
          senderPhoneNumber={senderPhone}
        />

        <Textt variant="span1-satoshi" className="underline">
          Request new code
        </Textt>
      </Card>
    </>
  );
}

export default Verify;
