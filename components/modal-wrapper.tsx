"use client";
import React from "react";

function ModalWrapper({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      onClick={() => {
        onClose();
      }}
      className={`left-0 top-0 z-50 flex h-screen w-screen items-center justify-center transition-colors ${open ? "visible bg-black/25" : "invisible"} fixed`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`mx-4 w-full max-w-[466px] rounded-[20px] bg-white p-5 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        {children ?? "No content"}
      </div>
    </div>
  );
}

export default ModalWrapper;
