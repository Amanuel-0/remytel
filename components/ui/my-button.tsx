import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?:
    | "primary-normal"
    | "primary-gradient-top-left"
    | "primary-gradient-top-right"
    | "primary-gradient-bottom-right"
    | "light-normal";
  type?: "button" | "submit";
  className?: string;
  onClick?: (param?: any) => void;
  disabled?: boolean;
  reff?: any;
}

function MyButton({
  variant,
  children,
  type,
  className,
  onClick,
  disabled,
  reff,
}: ButtonProps) {
  const BaseButton = ({ children, type, className }: ButtonProps) => {
    return (
      <button
        ref={reff}
        onClick={onClick}
        type={type ?? "button"}
        className={`bg-200% h-full max-h-[54px] min-h-[44px] w-full rounded-full  ${className}  ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };

  if (variant === "primary-normal") {
    return (
      <BaseButton
        type={type}
        className={`bg-[#04A94D] text-white hover:bg-[#04a94ee4] ${className}`}
      >
        {/* <BaseButton type={type} className={`bg-[#80C03F] text-white ${className}`}> */}
        {children}
      </BaseButton>
    );
  }

  if (variant === "primary-gradient-top-left") {
    return (
      <BaseButton
        type={type}
        className={`bg-gradient-to-tl from-[#80C03F] to-[#2CA342] text-white shadow-primary transition-all duration-300 hover:bg-right hover:shadow-md ${className}`}
      >
        {children}
      </BaseButton>
    );
  }

  if (variant === "primary-gradient-top-right") {
    return (
      <BaseButton
        type={type}
        className={`bg-gradient-to-tr from-[#80C03F] to-[#2CA342] text-white ${className}`}
      >
        {children}
      </BaseButton>
    );
  }

  if (variant === "primary-gradient-bottom-right") {
    return (
      <BaseButton
        type={type}
        className={`bg-200% bg-gradient-to-tr from-[#2CA342] to-[#80C03F] text-white shadow-primary transition-all duration-300 hover:bg-right hover:shadow-md ${className}`}
      >
        {children}
      </BaseButton>
    );
  }

  if (variant === "light-normal") {
    return (
      <BaseButton
        type={type}
        className={`border border-black bg-white text-black transition-all duration-300 hover:bg-primary/5 ${className}`}
      >
        {children}
      </BaseButton>
    );
  }

  return (
    <BaseButton type={type} className={className}>
      {children}
    </BaseButton>
  );
}

export default MyButton;
