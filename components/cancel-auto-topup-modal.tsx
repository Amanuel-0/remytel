"use client";
import React from "react";
import ModalWrapper from "./modal-wrapper";
import Textt from "./text";
import { useRouter } from "next/navigation";

function CancelAutoTopupModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const handleAutoTopupCancel = () => {
    console.log("Auto top-up cancelled");
    onClose();
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <div className="w-full max-w-[466px]">
        <div>
          <div className="flex flex-col items-center border-b border-b-[#E3E3E3] py-6">
            <Textt variant="h3-craftwork">Cancel auto top-up</Textt>

            <Textt variant="span1-satoshi" className="max-w-[320px] pt-5">
              Are you sure you want to cancel this auto top-up? All receipts
              will still be available in your history.
            </Textt>
          </div>

          <div className="flex justify-center gap-2 pt-7">
            <button
              type="button"
              onClick={onClose}
              className="h-full max-h-[54px] min-h-[44px] w-full max-w-[140px] rounded-full border border-[#C7C7C7]"
            >
              <Textt variant="span1-satoshi">Go back</Textt>
            </button>

            <button
              type="button"
              onClick={handleAutoTopupCancel}
              className="h-full max-h-[54px] min-h-[44px] w-full max-w-[140px] rounded-full border border-[#C7C7C7] bg-[#D72626]"
            >
              <Textt variant="span1-satoshi" className="text-white">
                Yes, cancel
              </Textt>
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default CancelAutoTopupModal;
