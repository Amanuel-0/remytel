import React from "react";

interface IconButtonProps {
  children: React.ReactNode;
  className?: string;
  //   icon: React.ReactNode;
  onClick?: () => void;
}
function IconButton({ children, className, onClick }: IconButtonProps) {
  return (
    <button
      className={`flex items-center justify-center rounded-full border border-[#BEBEBE] hover:bg-gray-100 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default IconButton;
