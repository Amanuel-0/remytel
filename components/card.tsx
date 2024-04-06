import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className }: CardProps) {
  return (
    <div className={`rounded-2xl bg-white p-5 drop-shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export default Card;
