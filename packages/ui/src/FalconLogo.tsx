import React from "react";

interface FalconLogoProps {
  size?: number;
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
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
