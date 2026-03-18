import React from "react";

interface FalconLogoProps {
  size?: number;
  color?: string;
  className?: string;
}

export function FalconLogo({
  size = 32,
  color = "#1B2A4A",
  className = "",
}: FalconLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Peregrine falcon logo"
      role="img"
    >
      {/* Falcon in stoop (dive) position - geometric silhouette */}
      <path
        d="M32 4
           C30 4 28 5 27 7
           L18 20
           C16 23 15 26 15 29
           L14 34
           C13 37 14 40 16 42
           L20 47
           L16 56
           C15 58 16 60 18 60
           L22 58
           L26 52
           L30 56
           C31 57 33 57 34 56
           L38 52
           L42 58
           L46 60
           C48 60 49 58 48 56
           L44 47
           L48 42
           C50 40 51 37 50 34
           L49 29
           C49 26 48 23 46 20
           L37 7
           C36 5 34 4 32 4Z"
        fill={color}
      />
      {/* Wing swept back - left */}
      <path
        d="M15 29
           L6 24
           C4 23 3 24 4 26
           L10 36
           L14 34
           L15 29Z"
        fill={color}
      />
      {/* Wing swept back - right */}
      <path
        d="M49 29
           L58 24
           C60 23 61 24 60 26
           L54 36
           L50 34
           L49 29Z"
        fill={color}
      />
      {/* Eye detail */}
      <circle cx="28" cy="14" r="2" fill="white" opacity="0.9" />
      <circle cx="36" cy="14" r="2" fill="white" opacity="0.9" />
    </svg>
  );
}
