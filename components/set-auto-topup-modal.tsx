"use client";
import React, { useCallback, useState } from "react";
import Textt from "./text";
import Button from "./ui/button";
import Image from "next/image";
import ModalWrapper from "./modal-wrapper";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

/**
 * a modal to set auto topup
 */
function SetAutoTopupModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [receiverPhone, setReceiverPhone] = useState<string>(
    searchParams.get("to") || "",
  );

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name?: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (name && value) {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

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

  const handleStarttopup = () => {
    router.push(pathname + `?${createQueryString("to", receiverPhone)}`);
    onClose();
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <div className="flex w-full justify-center">
        <div className="w-fit rounded-full bg-gradient-to-br from-[#80C03F] to-primary p-6">
          <Image
            src={"/assets/icons/schedule-icon-white.svg"}
            alt={"schedule"}
            width={33}
            height={34}
            className="h-6 w-6"
          />
        </div>
      </div>
      <Textt variant="h5-craftwork" className="mt-6 text-start md:text-center">
        Set Auto top-up
      </Textt>
      <Textt
        variant="p2-satoshi"
        className="mt-4 text-start md:text-center"
      >{`We'll automatically resend 138 ETB to +251984841930 so that you don't have to.`}</Textt>
      <Textt
        variant="h5-craftwork"
        className="mt-6 text-start font-semibold md:text-center"
      >
        Choose the Frequency:
      </Textt>
      <div className="mt-6">
        <Button className="border border-black bg-white text-black">
          <Textt variant="h6-satoshi">7 Days</Textt>
        </Button>
        <Button className="mt-[10px] border border-black bg-white text-black">
          <Textt variant="h6-satoshi">14 Days</Textt>
        </Button>
        <Button variant="primary-normal" className="mt-[10px]">
          <Textt variant="h6-satoshi" className="text-white">
            30 Days
          </Textt>
        </Button>

        <Textt variant="span1-satoshi" className="mt-6">
          Renews automatically. No extra costs. cancel anytime.
        </Textt>
      </div>
      <div className="mt-10">
        <Button className="border border-gray-300 bg-white text-black">
          <Textt variant="span2-satoshi">No Thanks</Textt>
        </Button>
        <Button variant="primary-normal" className="mt-[10px]">
          <Textt variant="span2-satoshi" className="text-white">
            Send Auto top-up
          </Textt>
        </Button>
      </div>
    </ModalWrapper>
  );
}

export default SetAutoTopupModal;
