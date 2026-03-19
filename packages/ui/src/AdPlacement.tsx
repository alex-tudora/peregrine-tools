"use client";

import React, { useEffect, useRef } from "react";

interface AdPlacementProps {
  className?: string;
}

export function AdPlacement({ className = "" }: AdPlacementProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] })
        .adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
      }
    } catch {
      // AdSense not loaded yet or blocked by ad blocker
    }
  }, []);

  return (
    <div className={`min-h-[90px] ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2865991938661915"
        data-ad-slot=""
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
