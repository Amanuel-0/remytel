import Link from "next/link";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?:
    | "primary-normal"
    | "primary-gradient-top-left"
    | "primary-gradient-top-right"
    | "primary-gradient-bottom-right"
    | "light-normal";
  type?: "button" | "submit" | "link";
  className?: string;
  onClick?: (param?: any) => void;
  disabled?: boolean;
  reff?: any;
  href?: string;
}

function MyButton({
  variant,
  children,
  type,
  className: cn,
  onClick,
  disabled = false,
  reff,
  href = "#",
}: ButtonProps) {
  let className = "";
  if (variant === "primary-normal") {
    className =
      "bg-[#04A94D] text-white transition-colors duration-300 hover:bg-[hsl(147,95%,28%)]";
  } else if (variant === "primary-gradient-top-left") {
    className =
      "bg-gradient-to-tl from-[#80C03F] to-[#2CA342] text-white shadow-primary transition-all duration-300 hover:bg-right hover:shadow-md";
  } else if (variant === "primary-gradient-top-right") {
    className = "bg-gradient-to-tr from-[#80C03F] to-[#2CA342] text-white";
  } else if (variant === "primary-gradient-bottom-right") {
    className =
      "bg-gradient-to-tr from-[#2CA342] to-[#80C03F] bg-200% text-white shadow-primary transition-all duration-300 hover:bg-right hover:shadow-md";
  } else if (variant === "light-normal") {
    className =
      "border border-black bg-white text-black transition-all duration-300 hover:bg-primary/5";
  }
  if (type === "link") {
    return (
      <Link
        href={href}
        className={`flex h-full max-h-[54px] min-h-[44px] w-full items-center justify-center rounded-full bg-200%  ${className} ${cn}  ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      ref={reff}
      onClick={onClick}
      type={type ?? "button"}
      className={`h-full max-h-[54px] min-h-[44px] w-full rounded-full bg-200%  ${className} ${cn}  ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default MyButton;
