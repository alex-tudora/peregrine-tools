import React from "react";

interface KnightLogoProps {
  size?: number;
  className?: string;
}

export function KnightLogo({ size = 40, className = "" }: KnightLogoProps) {
  return (
    <img
      src="/knight-logo.png"
      alt="Convert-a-Lot knight mascot"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
