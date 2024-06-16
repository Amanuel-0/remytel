import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`h-full w-full px-4 py-3 sm:py-10 md:px-[100px] ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
