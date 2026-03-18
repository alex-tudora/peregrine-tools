import React from "react";

interface FalconLogoProps {
  size?: number;
  color?: string;
  className?: string;
}

export function FalconLogo({
  size = 32,
  color = "currentColor",
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
      {/* Head — tapered teardrop pointing down-right */}
      <path
        d="M32 6 C28 6 25 9 25 13 L25 18 C25 20 26.5 22 29 23 L32 24 L35 23 C37.5 22 39 20 39 18 L39 13 C39 9 36 6 32 6Z"
        fill={color}
      />
      {/* Malar stripe — the falcon's signature marking */}
      <path
        d="M28.5 17 L27 22 L29 21 L30 18Z"
        fill={color}
        opacity="0.5"
      />
      <path
        d="M35.5 17 L37 22 L35 21 L34 18Z"
        fill={color}
        opacity="0.5"
      />
      {/* Body — sleek fuselage tapering to tail */}
      <path
        d="M29 23 L26 30 L25 42 L27 50 L30 54 L32 56 L34 54 L37 50 L39 42 L38 30 L35 23Z"
        fill={color}
      />
      {/* Left wing — swept back in stoop, geometric facets */}
      <path
        d="M26 30 L18 26 L8 22 C6 21.2 5 22 5.5 24 L10 34 L16 40 L25 42Z"
        fill={color}
      />
      {/* Right wing — mirrored */}
      <path
        d="M38 30 L46 26 L56 22 C58 21.2 59 22 58.5 24 L54 34 L48 40 L39 42Z"
        fill={color}
      />
      {/* Left wing leading-edge highlight */}
      <path
        d="M26 30 L18 26 L10 34 L25 40Z"
        fill={color}
        opacity="0.75"
      />
      {/* Right wing leading-edge highlight */}
      <path
        d="M38 30 L46 26 L54 34 L39 40Z"
        fill={color}
        opacity="0.75"
      />
      {/* Tail feathers — forked */}
      <path
        d="M30 54 L28 60 L31 57 L32 56 L33 57 L36 60 L34 54Z"
        fill={color}
      />
      {/* Eye — left */}
      <circle cx="29.5" cy="12.5" r="1.5" fill="white" opacity="0.95" />
      {/* Eye — right */}
      <circle cx="34.5" cy="12.5" r="1.5" fill="white" opacity="0.95" />
    </svg>
  );
}
