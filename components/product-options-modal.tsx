import React from "react";
import ModalWrapper from "./modal-wrapper";

function ProductOptionsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <ModalWrapper open={open} onClose={onClose}>
      product options. topups & plans
    </ModalWrapper>
  );
}

export default ProductOptionsModal;
