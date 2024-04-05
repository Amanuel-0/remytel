"use client";
import React, { useRef, useEffect } from "react";
import Clipboard from "clipboard"; // Import the clipboard package
import Textt from "../text";
import MyButton from "./my-button";
import Image from "next/image";

interface CopyToClipboardBtnProps {
  textToCopy: any;
  children?: React.ReactNode;
  variant?: "btn" | "icon-btn";
  onClick?: () => void;
}

function CopyToClipboardBtn({
  children,
  variant = "btn",
  textToCopy,
  onClick,
}: CopyToClipboardBtnProps) {
  const textRef = useRef<any>(null); // Create a reference to the text element

  useEffect(() => {
    if (!textRef.current) return;

    // Initialize clipboard instance
    const clipboard = new Clipboard(textRef.current, {
      text: () => textToCopy, // Specify the text to copy
    });

    // Event listener for successful copy
    clipboard.on("success", (e) => {
      console.log("Text copied to clipboard:", e.text);
      // You can add any additional logic here, such as showing a success message
    });

    // Event listener for error
    clipboard.on("error", (e) => {
      console.error("Error copying text to clipboard:", e);
      // You can add any additional error handling logic here
    });

    // Cleanup function to dispose clipboard instance
    return () => {
      clipboard.destroy();
    };
  }, [textToCopy]); // Ensure effect runs when textToCopy changes

  if (variant === "icon-btn") {
    return (
      <button
        ref={textRef}
        data-clipboard-text={textToCopy}
        onClick={onClick}
        className="rounded-lg border border-[#ECECEC] p-2 hover:cursor-pointer"
      >
        <Image
          src={"/assets/icons/copy-icon.svg"}
          alt="copy-icon"
          width={18}
          height={18}
        />
      </button>
    );
  }

  return (
    <>
      <MyButton
        reff={textRef}
        data-clipboard-text={textToCopy}
        variant="primary-normal"
        className="mb-4"
        onClick={onClick}
      >
        <Textt variant="h5-satoshi" className="text-white">
          {children}
        </Textt>
      </MyButton>
    </>
  );
}

export default CopyToClipboardBtn;
