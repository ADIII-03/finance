import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function Card({ children, className = "", noPadding = false }: CardProps) {
  return (
    <div
      className={`card ${noPadding ? "" : "p-5 md:p-6"} ${className}`}
    >
      {children}
    </div>
  );
}
