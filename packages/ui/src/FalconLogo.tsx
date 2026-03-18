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
      height={size * 0.7}
      viewBox="0 0 120 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Peregrine falcon logo"
      role="img"
    >
      {/* Main body silhouette — falcon in stoop, diving right */}
      <path
        d={[
          // Tail tips (sharp, trailing upper-left)
          "M2 8",
          "L18 24",
          "L8 18",
          "L22 30",
          // Upper wing line sweeping back
          "L14 22",
          "L32 36",
          // Top of body flowing into head
          "C42 42 56 46 72 52",
          // Forehead curve
          "C82 56 92 60 100 64",
          // Beak tip
          "L108 68",
          "C110 69 112 68 111 66",
          // Lower beak
          "L106 64",
          // Jaw line curving back
          "C100 62 96 62 92 62",
          // Malar stripe starts (the peregrine's dark cheek mark)
          // Chin / throat line sweeping back under body
          "C84 60 74 56 64 50",
          // Belly curve
          "C50 42 38 34 28 28",
          // Back to tail
          "C18 20 10 14 2 8",
          "Z",
        ].join(" ")}
        fill={color}
      />
      {/* Wing speed line — negative space swoosh separating wing from body */}
      <path
        d="M16 22 C28 30 46 40 72 52"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Malar stripe — the peregrine's signature curved cheek marking */}
      <path
        d="M88 58 C84 56 82 60 86 62"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Eye — sharp triangular cutout */}
      <path
        d="M92 60 L96 58 L94 62 Z"
        fill="white"
      />
    </svg>
  );
}
