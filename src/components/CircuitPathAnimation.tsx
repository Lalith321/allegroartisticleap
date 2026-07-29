import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CircuitPathAnimation.css";

interface CircuitPathAnimationProps {
  onNodeClick?: (id: string) => void;
}

// ── ViewBox: full-width landscape ────────────────────────────
// 1200 × 600  — spine runs horizontally, branches drop down
const W = 1200;
const H = 600;
const SPINE_Y = 160; // horizontal spine Y

// Hub X positions along the spine
const HX = { launch: 80, h1: 280, h2: 520, h3: 760, h4: 1000 };

// Branch drop distances
const D1 = 100; // first branch node drop
const D2 = 200; // second branch node drop

// ── Spine segments ────────────────────────────────────────────
const SPINE_SEGS = [
  { id: "s0", d: `M${HX.launch} ${SPINE_Y} H${HX.h1}`,  start: 0.00, end: 0.12 },
  { id: "s1", d: `M${HX.h1}    ${SPINE_Y} H${HX.h2}`,  start: 0.12, end: 0.30 },
  { id: "s2", d: `M${HX.h2}    ${SPINE_Y} H${HX.h3}`,  start: 0.30, end: 0.52 },
  { id: "s3", d: `M${HX.h3}    ${SPINE_Y} H${HX.h4}`,  start: 0.52, end: 0.74 },
  { id: "s4", d: `M${HX.h4}    ${SPINE_Y} H${W - 60}`, start: 0.74, end: 0.88 },
];

// ── Branch segments ───────────────────────────────────────────
// Each branch: vertical drop from hub, then optional horizontal run
const BRANCH_SEGS = [
  // Hub 1 — 3D
  { id: "b1a", d: `M${HX.h1 - 60} ${SPINE_Y} V${SPINE_Y + D1}`,                                    start: 0.14, end: 0.24 },
  { id: "b1b", d: `M${HX.h1 + 60} ${SPINE_Y} V${SPINE_Y + D1}`,                                    start: 0.14, end: 0.24 },
  { id: "b1c", d: `M${HX.h1}      ${SPINE_Y} V${SPINE_Y + D2}`,                                    start: 0.18, end: 0.28 },

  // Hub 2 — AI
  { id: "b2a", d: `M${HX.h2 - 70} ${SPINE_Y} V${SPINE_Y + D1}`,                                    start: 0.32, end: 0.42 },
  { id: "b2b", d: `M${HX.h2 + 70} ${SPINE_Y} V${SPINE_Y + D1}`,                                    start: 0.32, end: 0.42 },
  { id: "b2c", d: `M${HX.h2 - 70} ${SPINE_Y + D1} H${HX.h2 - 70 - 50} V${SPINE_Y + D2}`,          start: 0.36, end: 0.46 },

  // Hub 3 — Art
  { id: "b3a", d: `M${HX.h3 - 60} ${SPINE_Y} V${SPINE_Y + D1}`,                                    start: 0.54, end: 0.64 },
  { id: "b3b", d: `M${HX.h3 + 60} ${SPINE_Y} V${SPINE_Y + D1}`,                                    start: 0.54, end: 0.64 },
  { id: "b3c", d: `M${HX.h3 + 60} ${SPINE_Y + D1} H${HX.h3 + 60 + 50} V${SPINE_Y + D2}`,          start: 0.58, end: 0.68 },

  // Hub 4 — Code
  { id: "b4a", d: `M${HX.h4 - 60} ${SPINE_Y} V${SPINE_Y + D1}`,                                    start: 0.76, end: 0.86 },
  { id: "b4b", d: `M${HX.h4 + 60} ${SPINE_Y} V${SPINE_Y + D1}`,                                    start: 0.76, end: 0.86 },
];

// ── Nodes ─────────────────────────────────────────────────────
interface NodeDef {
  id: string;
  x: number;
  y: number;
  label: string;
  sub: string;
  isMain: boolean;
  threshold: number;
  targetSection?: string;
  labelAnchor?: "middle" | "start" | "end";
  labelDy?: number;
}

const NODES: NodeDef[] = [
  // Launch
  { id: "launch", x: HX.launch, y: SPINE_Y, label: "BOOT", sub: "System initialised", isMain: false, threshold: 0.02, labelDy: -22 },

  // Hub 1 — 3D
  { id: "3d",    x: HX.h1,          y: SPINE_Y,        label: "3D ENVIRONMENTS", sub: "Blender · Unreal · Sculpting",   isMain: true,  threshold: 0.12, targetSection: "3d",   labelDy: -28 },
  { id: "3d-a",  x: HX.h1 - 60,    y: SPINE_Y + D1,   label: "Shaders",         sub: "PBR · Procedural materials",     isMain: false, threshold: 0.24, labelDy: 22 },
  { id: "3d-b",  x: HX.h1 + 60,    y: SPINE_Y + D1,   label: "Environments",    sub: "Scene composition",              isMain: false, threshold: 0.24, labelDy: 22 },
  { id: "3d-c",  x: HX.h1,         y: SPINE_Y + D2,   label: "Animation",       sub: "Rigging · Keyframes",            isMain: false, threshold: 0.28, labelDy: 22 },

  // Hub 2 — AI
  { id: "ai",    x: HX.h2,          y: SPINE_Y,        label: "ARTIFICIAL INTELLIGENCE", sub: "Deep Learning · CNNs · Gen AI", isMain: true, threshold: 0.30, targetSection: "ai", labelDy: -28 },
  { id: "ai-a",  x: HX.h2 - 70,    y: SPINE_Y + D1,   label: "Models",          sub: "CNN · ResNet · GAN",             isMain: false, threshold: 0.42, labelDy: 22 },
  { id: "ai-b",  x: HX.h2 + 70,    y: SPINE_Y + D1,   label: "Data Systems",    sub: "Pipelines · Features",           isMain: false, threshold: 0.42, labelDy: 22 },
  { id: "ai-c",  x: HX.h2 - 120,   y: SPINE_Y + D2,   label: "Inference",       sub: "Deploy · Optimise",              isMain: false, threshold: 0.46, labelDy: 22 },

  // Hub 3 — Art
  { id: "art",   x: HX.h3,          y: SPINE_Y,        label: "DIGITAL ART",     sub: "Portraits · Concept · Logo",     isMain: true,  threshold: 0.52, targetSection: "art",  labelDy: -28 },
  { id: "art-a", x: HX.h3 - 60,    y: SPINE_Y + D1,   label: "Portraits",       sub: "Character studies",              isMain: false, threshold: 0.64, labelDy: 22 },
  { id: "art-b", x: HX.h3 + 60,    y: SPINE_Y + D1,   label: "Concept",         sub: "Sci-fi · Futurism",              isMain: false, threshold: 0.64, labelDy: 22 },
  { id: "art-c", x: HX.h3 + 110,   y: SPINE_Y + D2,   label: "Motion",          sub: "VFX · Compositing",              isMain: false, threshold: 0.68, labelDy: 22 },

  // Hub 4 — Code
  { id: "code",  x: HX.h4,          y: SPINE_Y,        label: "PROGRAMMING",     sub: "Python · C++ · React · Java",    isMain: true,  threshold: 0.74, targetSection: "code", labelDy: -28 },
  { id: "code-a",x: HX.h4 - 60,    y: SPINE_Y + D1,   label: "Systems",         sub: "Backend · APIs",                 isMain: false, threshold: 0.86, labelDy: 22 },
  { id: "code-b",x: HX.h4 + 60,    y: SPINE_Y + D1,   label: "Tools",           sub: "Automation · Deploy",            isMain: false, threshold: 0.86, labelDy: 22 },
];

const lerp01 = (p: number, s: number, e: number) =>
  p <= s ? 0 : p >= e ? 1 : (p - s) / (e - s);

// ── Component ─────────────────────────────────────────────────
const CircuitPathAnimation: React.FC<CircuitPathAnimationProps> = ({ onNodeClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const topRef = useRef(0);
  const heightRef = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (!sectionRef.current) return;
      topRef.current    = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      heightRef.current = sectionRef.current.offsetHeight;
    };
    measure();
    const t = window.setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    const onScroll = () => {
      const total = heightRef.current - window.innerHeight;
      setProgress(total > 0 ? Math.min(Math.max((window.scrollY - topRef.current) / total, 0), 1) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.clearTimeout(t); window.removeEventListener("resize", measure); window.removeEventListener("scroll", onScroll); };
  }, []);

  const activeMain = NODES.filter(n => n.isMain && progress >= n.threshold).slice(-1)[0];
  const mainNodes  = NODES.filter(n => n.isMain && n.targetSection);

  return (
    <div className="cpa-section" ref={sectionRef}>
      <div className="cpa-stage">

        {/* ── Top label ── */}
        <div className="cpa-top-bar">
          <span className="cpa-top-bar__tag">Portfolio · System Map</span>
          <span className="cpa-top-bar__hint">Scroll to activate</span>
        </div>

        {/* ── Full-width SVG circuit ── */}
        <div className="cpa-canvas">
          <svg viewBox={`0 0 ${W} ${H}`} className="cpa-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Dot grid */}
              <pattern id="cpa-dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="0.8" fill="rgba(245,240,232,0.08)" />
              </pattern>

              {/* Spine gradient — left to right */}
              <linearGradient id="cpa-spine-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#F5F0E8" stopOpacity="1" />
                <stop offset="100%" stopColor="#C9963A" stopOpacity="1" />
              </linearGradient>

              {/* Branch gradient — top to bottom */}
              <linearGradient id="cpa-branch-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#C9963A" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F5F0E8" stopOpacity="0.7" />
              </linearGradient>

              {/* Glow */}
              <filter id="cpa-glow-sm" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="cpa-glow-lg" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="7" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Dot grid background */}
            <rect width={W} height={H} fill="url(#cpa-dots)" />

            {/* Ghost spine */}
            <line x1={HX.launch} y1={SPINE_Y} x2={W - 60} y2={SPINE_Y}
              stroke="rgba(245,240,232,0.05)" strokeWidth="1" strokeDasharray="8 8" />

            {/* ── Spine ── */}
            {SPINE_SEGS.map(seg => (
              <motion.path key={seg.id} d={seg.d}
                fill="none" stroke="url(#cpa-spine-grad)"
                strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: lerp01(progress, seg.start, seg.end) }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            ))}

            {/* ── Branches ── */}
            {BRANCH_SEGS.map(seg => {
              const pl = lerp01(progress, seg.start, seg.end);
              return (
                <motion.path key={seg.id} d={seg.d}
                  fill="none" stroke="url(#cpa-branch-grad)"
                  strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: pl, opacity: pl > 0 ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              );
            })}

            {/* ── Nodes ── */}
            {NODES.map(node => {
              const active = progress >= node.threshold;
              const isHov  = hovered === node.id;
              const r      = node.isMain ? 14 : 8;
              const clickable = node.isMain && !!node.targetSection && active;

              return (
                <motion.g key={node.id}
                  style={{ cursor: clickable ? "pointer" : "default" }}
                  onClick={() => clickable && onNodeClick?.(node.targetSection!)}
                  onMouseEnter={() => active && setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {/* Pulse ring — main hubs */}
                  {node.isMain && active && (
                    <motion.circle cx={node.x} cy={node.y} r={r}
                      fill="none" stroke="rgba(201,150,58,0.25)" strokeWidth="1"
                      animate={{ r: [r + 8, r + 22], opacity: [0.6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}

                  {/* Node body */}
                  <motion.circle cx={node.x} cy={node.y} r={r}
                    className={node.isMain ? "cpa-node-hub" : "cpa-node-leaf"}
                    filter={node.isMain ? "url(#cpa-glow-lg)" : "url(#cpa-glow-sm)"}
                  />

                  {/* Diamond overlay on main hubs */}
                  {node.isMain && (
                    <rect
                      x={node.x - 7} y={node.y - 7}
                      width="14" height="14"
                      className="cpa-node-diamond"
                      transform={`rotate(45 ${node.x} ${node.y})`}
                    />
                  )}

                  {/* Hub label — always visible when active */}
                  {node.isMain && (
                    <motion.text x={node.x} y={node.y + (node.labelDy ?? -24)}
                      textAnchor="middle" className="cpa-lbl-hub"
                      initial={{ opacity: 0 }}
                      animate={active ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 }}
                    >
                      {node.label}
                    </motion.text>
                  )}

                  {/* Hub sub-label */}
                  {node.isMain && (
                    <motion.text x={node.x} y={node.y + (node.labelDy ?? -24) + 16}
                      textAnchor="middle" className="cpa-lbl-sub"
                      initial={{ opacity: 0 }}
                      animate={active ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.35, delay: 0.2 }}
                    >
                      {node.sub}
                    </motion.text>
                  )}

                  {/* Leaf label — always visible when active */}
                  {!node.isMain && active && (
                    <>
                      <motion.text x={node.x} y={node.y + (node.labelDy ?? 20)}
                        textAnchor="middle" className="cpa-lbl-leaf"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {node.label}
                      </motion.text>
                      <motion.text x={node.x} y={node.y + (node.labelDy ?? 20) + 13}
                        textAnchor="middle" className="cpa-lbl-leaf-sub"
                        initial={{ opacity: 0 }} animate={{ opacity: 0.55 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {node.sub}
                      </motion.text>
                    </>
                  )}

                  {/* Hover tooltip on leaf nodes */}
                  <AnimatePresence>
                    {!node.isMain && isHov && active && (
                      <motion.g key="tip"
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}
                      >
                        <rect x={node.x - 60} y={node.y - 46} width="120" height="28"
                          rx="3" fill="rgba(10,8,12,0.95)"
                          stroke="rgba(201,150,58,0.5)" strokeWidth="0.8"
                        />
                        <text x={node.x} y={node.y - 28} textAnchor="middle" className="cpa-tip-text">
                          {node.sub}
                        </text>
                      </motion.g>
                    )}
                  </AnimatePresence>
                </motion.g>
              );
            })}

            {/* ── Active hub scan line ── */}
            {activeMain && (
              <motion.line x1="0" x2={W} y1={activeMain.y} y2={activeMain.y}
                stroke="rgba(201,150,58,0.08)" strokeWidth="1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {/* ── Progress indicator on spine ── */}
            <motion.circle
              cx={HX.launch + (W - 60 - HX.launch) * Math.min(progress / 0.88, 1)}
              cy={SPINE_Y}
              r="4"
              fill="#F5F0E8"
              filter="url(#cpa-glow-lg)"
              style={{ opacity: progress > 0.01 ? 1 : 0 }}
            />
          </svg>
        </div>

        {/* ── Info + nav row ── */}
        <div className="cpa-bottom">
          <AnimatePresence mode="wait">
            <motion.div className="cpa-info"
              key={activeMain?.id ?? "idle"}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
            >
              <span className="cpa-info__tag">{activeMain ? "● Active" : "○ Standby"}</span>
              <span className="cpa-info__name">{activeMain?.label ?? "Scroll to begin"}</span>
              <span className="cpa-info__desc">{activeMain?.sub ?? "Trace the circuit to unlock each domain"}</span>
            </motion.div>
          </AnimatePresence>

          <div className="cpa-nav">
            {mainNodes.map(node => {
              const on = progress >= node.threshold;
              return (
                <motion.button key={node.id} type="button"
                  className={`cpa-nav-btn${on ? " cpa-nav-btn--on" : ""}`}
                  onClick={() => on && onNodeClick?.(node.targetSection!)}
                  disabled={!on}
                  whileHover={on ? { scale: 1.04 } : {}}
                  whileTap={on ? { scale: 0.96 } : {}}
                >
                  <span className="cpa-nav-btn__led" />
                  {node.label}
                </motion.button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CircuitPathAnimation;
