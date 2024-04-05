"use client";
import React, { useState } from "react";
import Image from "next/image";
import ModalWrapper from "./modal-wrapper";
import Textt from "./text";
import MyButton from "./ui/my-button";
import { useSearchParams } from "next/navigation";

function SaveContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const searchParams = useSearchParams();
  const receiverPhone = searchParams.get("to") || "";
  const [receiverName, setReceiverName] = useState<string>("");

  const handleSaveContact = () => {
    console.log("Save Contact/Receiver", receiverName, receiverPhone);
    onClose();
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <div className="w-full max-w-[466px]">
        <div className="flex items-center justify-between">
          <div>
            <span className="flex items-center justify-center gap-3">
              <Image
                src={"/assets/images/flags/ethiopian-flag.png"}
                alt="ethiopian-flag"
                width={30}
                height={30}
              />
              <Textt variant="h6-satoshi">{receiverPhone}</Textt>
              <Image
                src={"/assets/images/ethiotel-logo.svg"}
                alt="ethiotel-logo"
                width={55}
                height={14}
              />
            </span>
          </div>
        </div>

        <div>
          <input
            id="nameOnCard"
            type="text"
            placeholder="Contact Name"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            className="mt-4 block h-[44px] w-full rounded-[36px] border border-[#DBDBDB] p-3  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#808080] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
          />

          <MyButton
            variant="primary-normal"
            className="mt-2"
            onClick={handleSaveContact}
          >
            <Textt variant="h5-satoshi" className="text-white">
              Save Contact
            </Textt>
          </MyButton>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default SaveContactModal;
