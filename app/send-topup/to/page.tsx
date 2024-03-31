"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import Card from "@/components/card";
import PhoneInputLib from "@/components/form/phone-input-lib";
import Textt from "@/components/text";
import Button from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

function To() {
  const [receiverPhoneNumber, setReceiverPhoneNumber] = React.useState("");
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

  const handleStarttopup = () => {
    router.push(
      `/send-topup/options?${createQueryString("to", receiverPhoneNumber)}`,
    );
  };

  return (
    <section className="relative my-10 flex h-[264px] flex-col items-center sm:my-20">
      <>
        <Card className="flex h-[210px] w-full flex-col justify-between px-4 py-2 sm:h-[225px] sm:w-[427px]">
          <Textt variant="h4-craftwork" className="mb-7 mt-3">
            Ready To Send a top-up?
          </Textt>

          <PhoneInputLib
            hideDropdown={true}
            disableCountryGuess={true}
            value={receiverPhoneNumber}
            onChange={(val) => setReceiverPhoneNumber(val)}
          />
          {/* <PhoneInput className="mb-3" /> */}
          {/* <Button variant="primary-normal">Start top-up</Button> */}
          <Button
            variant="primary-normal"
            onClick={handleStarttopup}
            className="mt-4"
          >
            <Textt variant="h6-satoshi" className="text-white">
              Start top-up
            </Textt>
          </Button>
        </Card>

        <span className="my-5 flex h-[36px] w-[163px] flex-row items-center justify-center gap-[10px] rounded-full border border-[#E1E1E1] bg-white text-sm leading-[18.4px]">
          <span>With in 5 seconds</span>
          <Image
            src={"/assets/icons/lighting-bolt-icon.svg"}
            alt={""}
            width={8}
            height={14}
          />
        </span>
      </>
    </section>
  );
}

export default To;
