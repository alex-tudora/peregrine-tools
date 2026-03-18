import React from "react";

interface KnightLogoProps {
  size?: number;
  className?: string;
}

export function KnightLogo({ size = 40, className = "" }: KnightLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Convert-a-Lot knight mascot"
      role="img"
    >
      {/* Plume / feather on top */}
      <path
        d="M32 4C28 4 26 8 27 12C28 14 30 15 32 16C34 15 36 14 37 12C38 8 36 4 32 4Z"
        fill="#F97316"
      />
      <path
        d="M32 8C30 6 27 7 28 10C29 12 31 14 32 15C33 14 35 12 36 10C37 7 34 6 32 8Z"
        fill="#FB923C"
      />

      {/* Helmet top dome */}
      <path
        d="M16 28C16 20 23 14 32 14C41 14 48 20 48 28V32H16V28Z"
        fill="#F97316"
      />
      {/* Helmet highlight */}
      <path
        d="M20 28C20 22 25 17 32 17C39 17 44 22 44 28V30H20V28Z"
        fill="#FB923C"
      />

      {/* Helmet middle band */}
      <rect x="14" y="30" width="36" height="6" rx="1" fill="#1B2A4A" />

      {/* Visor / face area */}
      <path
        d="M16 36H48V46C48 50 44 54 40 54H24C20 54 16 50 16 46V36Z"
        fill="#F97316"
      />

      {/* Visor slit (dark) */}
      <rect x="18" y="38" width="28" height="10" rx="5" fill="#1B2A4A" />

      {/* Eyes */}
      <circle cx="27" cy="43" r="2.5" fill="white" />
      <circle cx="37" cy="43" r="2.5" fill="white" />

      {/* Eye pupils */}
      <circle cx="27.8" cy="43" r="1" fill="#1B2A4A" />
      <circle cx="37.8" cy="43" r="1" fill="#1B2A4A" />

      {/* Ear guards */}
      <rect x="10" y="30" width="6" height="14" rx="3" fill="#EA580C" />
      <rect x="48" y="30" width="6" height="14" rx="3" fill="#EA580C" />

      {/* Chin guard */}
      <path
        d="M24 54C24 54 28 58 32 58C36 58 40 54 40 54"
        stroke="#1B2A4A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Navy outlines for definition */}
      <path
        d="M16 28C16 20 23 14 32 14C41 14 48 20 48 28V32H16V28Z"
        stroke="#1B2A4A"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M16 36H48V46C48 50 44 54 40 54H24C20 54 16 50 16 46V36Z"
        stroke="#1B2A4A"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
