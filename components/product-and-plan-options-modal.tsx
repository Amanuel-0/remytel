import React from "react";
import ModalWrapper from "./modal-wrapper";
import ProductAndPlanOptions from "./product-and-plan-options";

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
        onClick={() => console.log("clicked")}
      >
        {handleAutoTopupModal ? (
          <ProductAndPlanOptions handleAutoTopupModal={handleAutoTopupModal} />
        ) : (
          <ProductAndPlanOptions />
        )}
      </div>
    </ModalWrapper>
  );
}

export default ProductAndPlanOptionsModal;
