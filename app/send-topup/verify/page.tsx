"use client";
import Card from "@/components/card";
import Textt from "@/components/text";
import TopupOptionDetailCard from "@/components/topup-option-detail-card";
import TopupToDetailCard from "@/components/topup-to-detail-card";
import VerifyOtp from "@/components/verify-otp";
import React, { useCallback, useContext } from "react";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { useSearchParams, useRouter } from "next/navigation";
import productContext from "@/states/product-context";
import authContext from "@/states/auth-context";

function Verify() {
  const { product } = useContext(productContext);
  const { isLoggedIn } = useContext(authContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const senderPhone = searchParams.get("from") ?? "";
  const senderCountryCode = searchParams.get("fromCountryCode") ?? "";
  const receiverPhone = searchParams.get("to") ?? "";

  // do not show this page if the user is logged in and return to
  // the previous page or somewhere else
  // if (isLoggedIn) {
  //   router.back();
  // }

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name?: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (name && value) params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleEditReceiverPhone = () => {
    router.push(`/?${createQueryString("to", receiverPhone || "")}`);
  };
  const handleEditSenderPhone = () => {
    router.push(
      `/send-topup/signup?${createQueryString("from", senderPhone || "")}`,
    );
  };
  const handleProductEdit = () => {
    if (searchParams.get("productId")) {
      router.push(
        `/send-topup/options?${createQueryString("productId", searchParams.get("productId") || "")}`,
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
        <VerifyOtp
          redirectUrl={`/send-topup/auto-topup?${createQueryString()}`}
          // redirectUrl={`/send-topup/bill?${createQueryString()}`}
          senderPhoneNumber={senderPhone}
          code={senderCountryCode}
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

export default Verify;
