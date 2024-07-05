"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import TopupOptionDetailCard from "@/components/topup-option-detail-card";
import TopupToDetailCard from "@/components/topup-to-detail-card";
import VerifyOtp from "@/components/verify-otp";
import React, { useContext } from "react";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { useRouter, useSearchParams } from "next/navigation";
import productContext from "@/states/product-context";
import sendTopupContext from "@/states/send-topup-context";
import withOutAuth from "@/components/public-route";

function Verify() {
  const searchParams = useSearchParams();
  const selectedOption = searchParams.get("selectedOption");
  const newUser = searchParams.get("newUser");

  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const { product } = useContext(productContext);
  const router = useRouter();

  const handleEditSenderPhone = () => {
    router.push(
      `/send-topup/signup?selectedOption=${selectedOption}${newUser === "true" && "&newUser=true"}`,
    );
  };
  const handleProductEdit = () => {
    router.push(`/send-topup/options${newUser === "true" && "&newUser=true"}`);
  };

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <>
      <Textt variant="h4-craftwork">You’re sending Remytel top-up to</Textt>

      <div className="mt-5">
        <TopupToDetailCard phone={sendTopup.to} />
      </div>

      <div className="mt-5">
        <TopupOptionDetailCard
          product={product}
          onProductEdit={handleProductEdit}
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
            {sendTopup.from}
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
        <VerifyOtp
          redirectUrl={`/send-topup/options?selectedOption=${selectedOption}`}
          redirectUrlIncompleteProfile={`/send-topup/complete-profile?selectedOption=${selectedOption}`}
          // redirectUrl={`/send-topup/auto-topup`}
          phoneNumber={sendTopup.from}
          code={sendTopup.fromCountryCode}
        />

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

export default withOutAuth(Verify);
