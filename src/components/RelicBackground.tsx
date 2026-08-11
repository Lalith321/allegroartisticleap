import React, { useRef, useEffect } from "react";
import { useScrollProgress } from "./ScrollProvider";
import "./RelicBackground.css";

export default function RelicBackground() {
  const bgRef = useRef<HTMLDivElement>(null);
  const progressRef = useScrollProgress();

  useEffect(() => {
    let raf: number;

    const tick = () => {
      const p = progressRef.current;

      if (bgRef.current) {
        // 0% = pristine studio marble
        // 100% = dark mossy forest ruin
        const brightness = 1 - p * 0.3;
        const contrast = 1 + p * 0.1;
        const saturate = 1 + p * 0.4;
        const sepia = p * 0.25;
        const hue = p * -10; // shift slightly greener

        bgRef.current.style.filter = `
          brightness(${brightness})
          contrast(${contrast})
          saturate(${saturate})
          sepia(${sepia})
          hue-rotate(${hue}deg)
        `;

        // Crack overlay opacity
        const crackOverlay = bgRef.current.querySelector(".relic-cracks") as HTMLElement;
        if (crackOverlay) {
          crackOverlay.style.opacity = String(Math.max(0, (p - 0.15) * 1.5));
        }

        // Moss overlay opacity
        const mossOverlay = bgRef.current.querySelector(".relic-moss") as HTMLElement;
        if (mossOverlay) {
          mossOverlay.style.opacity = String(Math.max(0, (p - 0.35) * 1.2));
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <div ref={bgRef} className="relic-background">
      {/* Base pillar image */}
      <div className="relic-base" />

      {/* Procedural crack texture */}
      <div
        className="relic-cracks"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03' numOctaves='4' seed='5'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 25 -10'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
          mixBlendMode: "multiply",
        }}
      />

      {/* Moss color wash */}
      <div
        className="relic-moss"
        style={{
          background: "radial-gradient(ellipse at 30% 70%, rgba(40, 80, 30, 0.5) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(50, 90, 40, 0.4) 0%, transparent 50%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Vignette darkening */}
      <div
        className="relic-vignette"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(20, 30, 15, 0.6) 100%)",
        }}
      />
    </div>
  );
}