import React from "react";

interface AdPlacementProps {
  className?: string;
}

export function AdPlacement({ className = "" }: AdPlacementProps) {
  // Renders nothing until an ad slot ID is configured.
  // Once AdSense is approved, replace this with the actual ad unit.
  return <div className={className} />;
}
