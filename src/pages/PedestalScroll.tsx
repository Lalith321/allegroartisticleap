import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import "./PedestalScroll.css";

const PedestalScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth the scroll value so it doesn't feel jittery
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Pillar draws from 0 to 100%
  const pillarDraw = useTransform(smoothProgress, [0.15, 0.65], [0, 1]);
  // Capital (top) fades and scales in
  const capitalReveal = useTransform(smoothProgress, [0.55, 0.85], [0, 1]);
  // Glow intensity
  const glowOpacity = useTransform(smoothProgress, [0.3, 0.7], [0, 0.6]);

  return (
    <div ref={containerRef} className="pedestal-section">
      <div className="pedestal-sticky">
        {/* Ambient glow behind pillar */}
        <motion.div
          className="pedestal-glow"
          style={{ opacity: glowOpacity }}
        />

        <svg
          className="pedestal-svg"
          viewBox="0 0 400 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            <linearGradient id="pillarGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2a2a28" />
              <stop offset="30%" stopColor="#4a4844" />
              <stop offset="50%" stopColor="#6a6660" />
              <stop offset="70%" stopColor="#4a4844" />
              <stop offset="100%" stopColor="#2a2a28" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8a7030" />
              <stop offset="40%" stopColor="#d4af37" />
              <stop offset="60%" stopColor="#f0d878" />
              <stop offset="100%" stopColor="#8a7030" />
            </linearGradient>
            <filter id="pedestalBlur">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          {/* Shaft */}
          <motion.path
            d="M 130 800 L 130 200 Q 130 180 110 160 L 110 140 L 290 140 L 290 160 Q 270 180 270 200 L 270 800"
            stroke="url(#pillarGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{
              pathLength: pillarDraw,
              opacity: useTransform(pillarDraw, [0, 0.05], [0, 1]),
            }}
          />

          {/* Fluting lines (decorative vertical grooves) */}
          {[160, 185, 210, 235, 240].map((x, i) => (
            <motion.line
              key={i}
              x1={x}
              y1="200"
              x2={x}
              y2="780"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              style={{ pathLength: pillarDraw }}
            />
          ))}

          {/* Base steps */}
          <motion.path
            d="M 90 800 L 310 800 L 310 790 L 90 790 Z M 100 790 L 300 790 L 300 775 L 100 775 Z"
            stroke="url(#pillarGrad)"
            strokeWidth="2"
            fill="rgba(255,255,255,0.02)"
            style={{ pathLength: pillarDraw }}
          />

          {/* Capital (Ionic-style scrolls) */}
          <motion.g style={{ opacity: capitalReveal, scale: capitalReveal }}>
            <path
              d="M 110 140 L 110 120 Q 90 100 70 110 Q 50 120 60 140 Q 70 160 90 150 L 110 140"
              stroke="url(#goldGrad)"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M 290 140 L 290 120 Q 310 100 330 110 Q 350 120 340 140 Q 330 160 310 150 L 290 140"
              stroke="url(#goldGrad)"
              strokeWidth="2.5"
              fill="none"
            />
            <rect
              x="105"
              y="100"
              width="190"
              height="20"
              rx="4"
              stroke="url(#goldGrad)"
              strokeWidth="2"
              fill="rgba(212,175,55,0.04)"
            />
            {/* Top slab */}
            <rect
              x="80"
              y="85"
              width="240"
              height="15"
              rx="3"
              stroke="url(#goldGrad)"
              strokeWidth="2"
              fill="rgba(212,175,55,0.06)"
            />
          </motion.g>

          {/* Floating particles that rise with scroll */}
          {Array.from({ length: 12 }).map((_, i) => {
            const delay = i * 0.04;
            const x = 140 + Math.random() * 120;
            const startY = 750 - i * 50;
            const particleProgress = useTransform(
              smoothProgress,
              [0.1 + delay, 0.6 + delay],
              [0, 1]
            );
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={startY}
                r={1.5 + Math.random() * 1.5}
                fill="#d4af37"
                style={{
                  opacity: useTransform(particleProgress, [0, 0.3, 1], [0, 0.8, 0]),
                  cy: useTransform(particleProgress, [0, 1], [startY, startY - 120]),
                }}
              />
            );
          })}
        </svg>

        {/* Text that fades in as pillar completes */}
        <motion.div
          className="pedestal-caption"
          style={{ opacity: useTransform(smoothProgress, [0.7, 0.95], [0, 1]), y: useTransform(smoothProgress, [0.7, 0.95], [30, 0]) }}
        >
          <span className="pedestal-eyebrow">Scroll to explore</span>
          <h2 className="pedestal-heading">Built from the ground up</h2>
        </motion.div>
      </div>
    </div>
  );
};

export default PedestalScroll;