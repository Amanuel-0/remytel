"use client";
import Card from "@/components/card";
import PhoneInput from "@/components/form/phone-input";
import Textt from "@/components/text";
import TopupOptionDetailCard from "@/components/topup-option-detail-card";
import TopupToDetailCard from "@/components/topup-to-detail-card";
import Button from "@/components/ui/button";
import VerifyOtp from "@/components/verify-otp";
import React, { useCallback } from "react";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import SetAutoTopupModal from "@/components/set-auto-topup-modal";

function Verify() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleEditReceiverPhone = () => {
    router.push(`/?${createQueryString("to", searchParams.get("to") || "")}`);
  };
  const handleEditSenderPhone = () => {
    router.push(
      `/send-topup/signup?${createQueryString("from", searchParams.get("from") || "")}`,
    );
  };
  const handleProductOrPlanEdit = () => {
    if (searchParams.get("productId")) {
      router.push(
        `/send-topup/options?${createQueryString("productId", searchParams.get("productId") || "")}`,
      );
    }
    if (searchParams.get("planId")) {
      router.push(
        `/send-topup/options?${createQueryString("planId", searchParams.get("planId") || "")}`,
      );
    }
  };

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <>
      <Textt variant="h4-craftwork">You’re senRemytel top-up to</Textt>

      <div className="mt-5">
        <TopupToDetailCard
          phone={searchParams.get("to") || ""}
          onPhoneEdit={handleEditReceiverPhone}
        />
      </div>

      <div className="mt-5">
        <TopupOptionDetailCard
          productOrPlan={
            searchParams.get("productId") || searchParams.get("planId") || ""
          }
          onProductOrPlanEdit={handleProductOrPlanEdit}
        />
      </div>

      <Card className="my-8">
        {/* back button */}
        <button
          onClick={handleNavigateBack}
          className="mb-6 flex h-8 items-center justify-start gap-2 rounded-full border-2 border-[#E1E1E1] px-5"
        >
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
            {searchParams.get("from")}
            {/* +251 93 542 5899 */}
          </Textt>

          <IconButton className="h-8 w-8" onClick={handleEditSenderPhone}>
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

      {/* <SetAutoTopupModal
        open={openEditPhoneModal}
        onClose={() => setOpenEditPhoneModal(false)}
      /> */}
    </>
  );
}

export default Verify;
