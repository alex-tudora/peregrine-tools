import React from "react";

interface FalconLogoProps {
  size?: number;
  color?: string;
  className?: string;
}

export function FalconLogo({
  size = 32,
  className = "",
}: FalconLogoProps) {
  return (
    <img
      src="/falcon-logo.png"
      alt="Peregrine falcon logo"
      width={size}
      height={size}
      className={`object-contain mix-blend-multiply ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
