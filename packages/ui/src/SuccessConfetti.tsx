"use client";

import { useState, useCallback } from "react";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
const PARTICLE_COUNT = 24;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function useConfetti() {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; color: string; delay: number; size: number }[]
  >([]);

  const fire = useCallback(() => {
    const newParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: Date.now() + i,
      x: randomBetween(-120, 120),
      y: randomBetween(-40, 40),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: randomBetween(0, 0.3),
      size: randomBetween(6, 10),
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1500);
  }, []);

  const ConfettiComponent = particles.length > 0 ? (
    <div className="confetti-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  ) : null;

  return { fire, Confetti: ConfettiComponent };
}
