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
      viewBox="0 0 80 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Convert-a-Lot knight mascot"
      role="img"
    >
      {/* === PLUME === */}
      <path
        d="M40 2C36 2 33 5 34 9C35 12 38 14 40 16C42 14 45 12 46 9C47 5 44 2 40 2Z"
        fill="#F97316"
      />
      <path
        d="M40 5C38 4 36 5 37 8C38 10.5 39.5 13 40 14.5C40.5 13 42 10.5 43 8C44 5 42 4 40 5Z"
        fill="#FB923C"
      />

      {/* === HELMET DOME === */}
      <path
        d="M15 34C15 24 26 16 40 16C54 16 65 24 65 34V40H15V34Z"
        fill="#F97316"
        stroke="#1B2A4A"
        strokeWidth="3"
      />
      {/* Helmet dome highlight (left half lighter) */}
      <path
        d="M19 33C19 25 28 19 40 19C46 19 51.5 21 55 24"
        stroke="#FB923C"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Helmet ventilation slits */}
      <rect x="28" y="28" width="2.5" height="8" rx="1" fill="#EA580C" />
      <rect x="33" y="28" width="2.5" height="8" rx="1" fill="#EA580C" />
      <rect x="38" y="28" width="2.5" height="8" rx="1" fill="#EA580C" />
      <rect x="43" y="28" width="2.5" height="8" rx="1" fill="#EA580C" />
      <rect x="48" y="28" width="2.5" height="8" rx="1" fill="#EA580C" />

      {/* === VISOR BAND (dark) === */}
      <path
        d="M13 40H67V52C67 52 63 54 40 54C17 54 13 52 13 52V40Z"
        fill="#1B2A4A"
        stroke="#1B2A4A"
        strokeWidth="2"
      />
      {/* Eyes */}
      <circle cx="30" cy="46" r="3.5" fill="white" />
      <circle cx="50" cy="46" r="3.5" fill="white" />
      {/* Pupils — looking slightly right */}
      <circle cx="31" cy="46" r="1.5" fill="#1B2A4A" />
      <circle cx="51" cy="46" r="1.5" fill="#1B2A4A" />

      {/* === EAR BOLTS === */}
      <circle cx="10" cy="46" r="7" fill="#1B2A4A" stroke="#1B2A4A" strokeWidth="1" />
      <circle cx="10" cy="46" r="4" fill="#F97316" />
      <circle cx="70" cy="46" r="7" fill="#1B2A4A" stroke="#1B2A4A" strokeWidth="1" />
      <circle cx="70" cy="46" r="4" fill="#F97316" />

      {/* === SHIELD / LOWER FACE === */}
      <path
        d="M15 52C15 52 15 54 15 58C15 70 25 82 40 86C55 82 65 70 65 58C65 54 65 52 65 52C63 54 52 56 40 56C28 56 17 54 15 52Z"
        fill="#F97316"
        stroke="#1B2A4A"
        strokeWidth="3"
      />
      {/* Shield inner border */}
      <path
        d="M20 57C20 57 20 59 20 62C20 71 28 79 40 82C52 79 60 71 60 62C60 59 60 57 60 57C57 58.5 49 60 40 60C31 60 23 58.5 20 57Z"
        fill="#EA580C"
        opacity="0.3"
      />

      {/* === FILE CONVERSION ICON ON SHIELD === */}
      {/* Left file */}
      <rect x="23" y="64" width="12" height="14" rx="2" fill="white" stroke="#1B2A4A" strokeWidth="1.5" />
      <path d="M30 64V67H33" stroke="#1B2A4A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Arrow */}
      <path
        d="M37 71L43 71"
        stroke="#1B2A4A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M41 68L44 71L41 74"
        stroke="#1B2A4A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Right file */}
      <rect x="45" y="64" width="12" height="14" rx="2" fill="white" stroke="#1B2A4A" strokeWidth="1.5" />
      <path d="M52 64V67H55" stroke="#1B2A4A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
