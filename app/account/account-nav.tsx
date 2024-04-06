"use client";
import React from "react";
import Image from "next/image";
import Textt from "@/components/text";
import MyButton from "@/components/ui/my-button";
import { useRouter } from "next/navigation";

function AccountNav() {
  const router = useRouter();

  const navigateBack = () => {
    // router.push("/account/home");
    router.back();
  };
  const navigateToSendTopupTo = () => {
    router.push("/send-topup/to");
  };

  return (
    <section className="my-5 flex w-full flex-col gap-5 md:flex-row md:justify-between">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <button
            type="button"
            onClick={navigateBack}
            className="flex h-11 w-11  min-w-12 items-center justify-center rounded-full bg-white"
          >
            <Image
              src={"/assets/icons/arrow-back-black-icon.svg"}
              alt={"arrow-back-black-icon"}
              width={16}
              height={16}
            />
          </button>
          <Textt variant="h6-satoshi" className="hidden md:block">
            My Account
          </Textt>
        </div>

        <div className="max-h-[44px]">
          <MyButton
            type="button"
            onClick={navigateToSendTopupTo}
            variant="primary-gradient-top-left"
            className="min-w-[125px]"
          >
            <Textt
              variant="span1-satoshi"
              className="font-extrabold text-white"
            >
              Send top-up
            </Textt>
          </MyButton>
        </div>
      </div>
    </section>
  );
}

export default AccountNav;
