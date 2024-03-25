import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className }: CardProps) {
  return <div className={`bg-white rounded-2xl drop-shadow-sm p-5 ${className}`}>{children}</div>;
}

export default Card;
