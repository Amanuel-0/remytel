"use client";
import React, { useContext, useEffect, useState } from "react";
import ModalWrapper from "./modal-wrapper";
import Textt from "./text";
import IconButton from "./ui/icon-button";
import Image from "next/image";
import MyButton from "./ui/my-button";
import { useRouter } from "next/navigation";
import PhoneInputLib from "./form/phone-input-lib";
import sendTopupContext from "@/states/send-topup-context";
import productContext from "@/states/product-context";

function EditReceiverPhoneModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { sendTopup, setSendTopup } = useContext(sendTopupContext);
  const { product } = useContext(productContext);
  const router = useRouter();
  const [receiverPhone, setReceiverPhone] = useState<string>(
    sendTopup.to || "",
  );

  useEffect(() => {
    setReceiverPhone(sendTopup.to || "");
  }, [sendTopup.to]);

  const handleProductEdit = () => {
    onClose();
    router.push(`/send-topup/options`);
  };

  const handleStarttopup = () => {
    setSendTopup({ ...sendTopup, to: receiverPhone });
    onClose();
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <div className="w-full max-w-[466px]">
        {!product.amount && (
          <Textt variant="span2-satoshi" className="text-start">
            Receiver
          </Textt>
        )}

        {product.amount && (
          <>
            <Textt variant="span2-satoshi" className="text-start">
              Receiver Gets:
            </Textt>

            <div className="mt-2 flex items-center justify-between">
              <Textt variant="h3-satoshi" className="text-start">
                {product.amount} ETB
              </Textt>

              {/* <IconButton className="h-8 w-8" onClick={handleProductEdit}>
                <Image
                  src={"/assets/icons/edit-icon.svg"}
                  alt={"edit-icon"}
                  width={14}
                  height={14}
                />
              </IconButton> */}
            </div>
          </>
        )}

        <div className="relative mt-8">
          <PhoneInputLib
            hideDropdown={true}
            disableCountryGuess={true}
            value={receiverPhone}
            onChange={(val) => setReceiverPhone(val)}
          />
          {/* <span className="absolute left-2 top-[29%] font-satoshi">+251 </span>
          <input
            type="text"
            placeholder="Enter recipient phone number"
            value={receiverPhone}
            onChange={(e) => setReceiverPhone(e.target.value)}
            id="receiverPhone"
            className="mt-[10px] block h-[54px] w-full rounded-[36px] border border-[#DBDBDB] p-3 pl-14  font-satoshi text-sm font-medium leading-[18.116px] text-[#808080] outline-none placeholder:font-satoshi placeholder:text-sm placeholder:font-medium placeholder:leading-[18.116px] placeholder:text-[#C7C7C7] focus:border-[#808080] focus:ring-1 focus:ring-[#808080]"
          /> */}
        </div>

        <MyButton
          variant="primary-normal"
          className="mt-4"
          onClick={handleStarttopup}
        >
          <Textt variant="h5-satoshi" className="text-white">
            Start top-up
          </Textt>
        </MyButton>
      </div>
    </ModalWrapper>
  );
}

export default EditReceiverPhoneModal;
