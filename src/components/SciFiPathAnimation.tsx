import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./SciFiPathAnimation.css";

interface SciFiPathAnimationProps {
  onNodeClick?: (id: string) => void;
}

const NODES = [
  {
    id: "3d",
    cx: 150,
    cy: 180,
    label: "3D Environments",
    description: "A launch pad for immersive Blender and Unreal worlds.",
    threshold: 0.18,
  },
  {
    id: "ai",
    cx: 138,
    cy: 320,
    label: "Artificial Intelligence",
    description: "A neural corridor for deep learning, generative AI, and applied models.",
    threshold: 0.42,
  },
  {
    id: "art",
    cx: 165,
    cy: 470,
    label: "Digital Art",
    description: "A creative nexus of concept visuals, portrait design, and sci-fi polish.",
    threshold: 0.68,
  },
  {
    id: "code",
    cx: 132,
    cy: 620,
    label: "Programming",
    description: "A systems node for algorithmic elegance, tools, and production-grade apps.",
    threshold: 0.92,
  },
];

const PATH_D = "M150 80 C140 170 180 220 160 300 S140 420 180 500 C220 580 130 650 150 740 S140 860 150 860";

const SciFiPathAnimation: React.FC<SciFiPathAnimationProps> = ({ onNodeClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const sectionTopRef = useRef(0);
  const sectionHeightRef = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (!sectionRef.current) return;
      sectionTopRef.current = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      sectionHeightRef.current = sectionRef.current.offsetHeight;
    };

    measure();
    const timeout = window.setTimeout(measure, 300);
    window.addEventListener("resize", measure);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;
      const sectionTop = sectionTopRef.current;
      const sectionHeight = sectionHeightRef.current;
      const scrolled = scrollY - sectionTop;
      const total = sectionHeight - viewH;
      const p = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="scifi-path-section" ref={sectionRef}>
      <div className="scifi-path-stage">
        <div className="scifi-path-title">Creative mission path</div>
        <div className="scifi-path-intro">Scroll to trace the launch path from the page top into four portfolio waypoints.</div>

        <div className="scifi-path-frame">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 900"
            className="scifi-path-svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="scifi-path-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5F0E8" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#D95B2A" stopOpacity="0.85" />
              </linearGradient>
              <radialGradient id="scifi-node-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F5F0E8" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#C9963A" stopOpacity="0" />
              </radialGradient>
              <filter id="scifi-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <motion.path
              d={PATH_D}
              fill="none"
              stroke="url(#scifi-path-gradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />

            <path
              d={PATH_D}
              fill="none"
              stroke="rgba(245, 240, 232, 0.08)"
              strokeWidth="1.4"
              strokeDasharray="8 8"
              vectorEffect="non-scaling-stroke"
            />

            {NODES.map(({ id, cx, cy, label, threshold }) => {
              const active = progress >= threshold;
              return (
                <motion.g
                  key={id}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={active ? {
                    opacity: 1,
                    scale: [1, 1.08, 1],
                    transition: { duration: 1.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                  } : { opacity: 0, scale: 0.7 }}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={12}
                    className="scifi-path-node-core"
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={26}
                    className="scifi-path-node-ring"
                  />
                  <motion.text
                    x={cx}
                    y={cy - 36}
                    textAnchor="middle"
                    className="scifi-path-node-label"
                    initial={{ opacity: 0, y: cy - 28 }}
                    animate={active ? { opacity: 1, y: cy - 40 } : { opacity: 0, y: cy - 24 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {label}
                  </motion.text>
                </motion.g>
              );
            })}

            <motion.circle
              cx={150}
              cy={80}
              r={10}
              className="scifi-path-launch-dot"
              animate={progress > 0 ? {
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.18, 1],
              } : { opacity: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>
        </div>

        <div className="scifi-path-summary">
          <div className="scifi-path-summary__title">Mission briefing</div>
          <div className="scifi-path-summary__copy">
            {(() => {
              const activeNode = NODES.filter((node) => progress >= node.threshold).slice(-1)[0];
              if (!activeNode) {
                return "Scroll to ignite the launch sequence. Each waypoint unlocks a core creative domain in the portfolio.";
              }
              return `${activeNode.label}: ${activeNode.description}`;
            })()}
          </div>
        </div>

        <div className="scifi-path-node-buttons">
          {NODES.map((node) => {
            const active = progress >= node.threshold;
            return (
              <button
                key={node.id}
                type="button"
                className={`scifi-path-node-button${active ? " scifi-path-node-button--active" : ""}`}
                onClick={() => active && onNodeClick?.(node.id)}
                disabled={!active}
              >
                {node.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SciFiPathAnimation;
