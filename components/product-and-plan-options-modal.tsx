import React from "react";
import ModalWrapper from "./modal-wrapper";
import ProductAndPlanOptions from "./product-and-plan-options";
import IconButton from "./ui/icon-button";
import Image from "next/image";

function ProductAndPlanOptionsModal({
  open,
  onClose,
  handleAutoTopupModal,
  // handleOnAutoTopupModalOpended,
}: {
  open: boolean;
  onClose: () => void;
  handleAutoTopupModal?: (value: boolean) => void;
  // handleOnAutoTopupModalOpended: () => void;
}) {
  return (
    <ModalWrapper open={open} onClose={onClose}>
      <div
        className="h-full max-h-full w-full overflow-y-scroll"
        style={{
          maxHeight: "80vh",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        // onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          className="ml-auto h-8 w-8 border-none transition-all duration-300"
          onClick={onClose}
        >
          <Image
            src={"/assets/icons/outline-circled-cancel.svg"}
            alt={"cose-icon"}
            width={23}
            height={23}
          />
        </IconButton>
        {handleAutoTopupModal ? (
          <ProductAndPlanOptions
            handleAutoTopupModal={handleAutoTopupModal}
            className="mt-0 pt-0"
          />
        ) : (
          <ProductAndPlanOptions className="mt-0 pt-0" />
        )}
      </div>
    </ModalWrapper>
  );
}

export default ProductAndPlanOptionsModal;
