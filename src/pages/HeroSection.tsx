import React, { useRef, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import NavPanel from "../components/NavPanel";
import "./HeroSection.css";

// ═════════════════════════════════════════════════════════════════
// 1. TYPES
// ═════════════════════════════════════════════════════════════════

interface SequenceAsset {
  id: string;
  folder: string;
  frameCount: number;
  /** Top-left X in 1024×1024 design space */
  x: number;
  /** Top-left Y in 1024×1024 design space */
  y: number;
  /** Width in design space. Height is derived from natural image ratio. */
  width: number;
  /** Interaction radius in design space. Mouse within this distance triggers animation. */
  interactionRadius: number;
  /** 0 = no parallax, 1 = full parallax (keep below 1 for subtlety) */
  parallaxDepth: number;
  zIndex: number;
}

interface AssetRuntime {
  config: SequenceAsset;
  progress: number;          // 0..1 smoothed
  targetActive: boolean;
  currentFrame: number;      // frame we want to show
  lastRenderedFrame: number; // last frame actually written to DOM
  element: HTMLImageElement;
  naturalRatio: number;      // height / width
  centerX: number;
  centerY: number;
}

// ═════════════════════════════════════════════════════════════════
// 2. CONFIGURATION — Edit this array to match your 5 folders
// ═════════════════════════════════════════════════════════════════

const DESIGN_SIZE = 1024;
const RISE_RATE = 0.08;
const FALL_RATE = 0.06;
const PARALLAX_FACTOR = 18; // max design-space px offset at depth 1.0
const FRAME_PAD = 6;

const ASSETS: SequenceAsset[] = [
  {
    id: "feather",
    folder: "feather",
    frameCount: 48,
    x: 417,
    y: 120,
    width: 190,
    interactionRadius: 170,
    parallaxDepth: 0.9,
    zIndex: 4,
  },
  {
    id: "flower1",
    folder: "LeftCornerFlower",
    frameCount: 86,
    x: 300,
    y: 300,
    width: 170,
    interactionRadius: 160,
    parallaxDepth: 0.35,
    zIndex: 2,
  },
  {
    id: "flower2",
    folder: "flower2",
    frameCount: 64,
    x: 560,
    y: 300,
    width: 170,
    interactionRadius: 160,
    parallaxDepth: 0.45,
    zIndex: 2,
  },
  {
    id: "flower3",
    folder: "flower3",
    frameCount: 64,
    x: 300,
    y: 560,
    width: 170,
    interactionRadius: 160,
    parallaxDepth: 0.55,
    zIndex: 3,
  },
  {
    id: "flower4",
    folder: "flower4",
    frameCount: 64,
    x: 560,
    y: 560,
    width: 170,
    interactionRadius: 160,
    parallaxDepth: 0.65,
    zIndex: 3,
  },
  {
    id: "clusterLeft",
    folder: "clusterLeft",
    frameCount: 48,
    x: 210,
    y: 430,
    width: 200,
    interactionRadius: 180,
    parallaxDepth: 0.25,
    zIndex: 1,
  },
  {
    id: "clusterRight",
    folder: "clusterRight",
    frameCount: 48,
    x: 640,
    y: 430,
    width: 200,
    interactionRadius: 180,
    parallaxDepth: 0.25,
    zIndex: 1,
  },
];

// ═════════════════════════════════════════════════════════════════
// 3. HELPERS
// ═════════════════════════════════════════════════════════════════

const padFrame = (n: number) => String(n).padStart(FRAME_PAD, "0");
const frameUrl = (folder: string, n: number) =>
  `${folder}/frame_${padFrame(n)}.png`;

// ═════════════════════════════════════════════════════════════════
// 4. ROLE ROTATOR (preserved from your original)
// ═════════════════════════════════════════════════════════════════

const ROLES = ["Computer Scientist", "AI Engineer", "3D Artist", "Digital Designer"];

const RoleRotator: React.FC = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        className="hero-role"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.38, ease: "easeInOut" }}
      >
        {ROLES[index]}
      </motion.span>
    </AnimatePresence>
  );
};

// ═════════════════════════════════════════════════════════════════
// 5. MAIN HERO SECTION
// ═════════════════════════════════════════════════════════════════

const HeroSection: React.FC<{ onContactHover: (v: boolean) => void }> = ({
  onContactHover,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mutable animation state (no React re-renders during RAF)
  const runtimesRef = useRef<AssetRuntime[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const containRef = useRef({ left: 0, top: 0, scale: 1 });
  const rafRef = useRef(0);
  const cacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const pendingRef = useRef(0);

  // ── Image cache / loader ────────────────────────────────────
  const getFrameImage = useCallback(
    (folder: string, frame: number): HTMLImageElement => {
      const key = `${folder}#${frame}`;
      const cached = cacheRef.current.get(key);
      if (cached) return cached;

      const img = new Image();
      img.decoding = "async";
      pendingRef.current++;
      setLoading(pendingRef.current > 0);

      img.onload = () => {
        pendingRef.current = Math.max(0, pendingRef.current - 1);
        setLoading(pendingRef.current > 0);
      };
      img.onerror = () => {
        pendingRef.current = Math.max(0, pendingRef.current - 1);
        setLoading(pendingRef.current > 0);
      };

      img.src = frameUrl(folder, frame);
      cacheRef.current.set(key, img);
      return img;
    },
    []
  );

  // ── Compute visible "object-fit: contain" rect ──────────────
  const computeContain = useCallback(() => {
    const stage = containerRef.current;
    if (!stage) return;

    const stageW = stage.clientWidth;
    const stageH = stage.clientHeight;
    const imgAspect = 1; // 1024×1024
    const stageAspect = stageW / stageH;

    let renderW: number, renderH: number;
    if (stageAspect > imgAspect) {
      renderH = stageH;
      renderW = stageH * imgAspect;
    } else {
      renderW = stageW;
      renderH = stageW / imgAspect;
    }

    containRef.current = {
      left: (stageW - renderW) / 2,
      top: (stageH - renderH) / 2,
      scale: renderW / DESIGN_SIZE,
    };
  }, []);

  // ── Convert page mouse pos → design-space coords ────────────
  const pageToDesign = useCallback((px: number, py: number) => {
    const stage = containerRef.current!.getBoundingClientRect();
    const localX = px - stage.left;
    const localY = py - stage.top;
    const { left, top, scale } = containRef.current;
    return {
      x: (localX - left) / scale,
      y: (localY - top) / scale,
    };
  }, []);

  // ── Layout all asset elements ───────────────────────────────
  const layoutAssets = useCallback(() => {
    const { left, top, scale } = containRef.current;
    runtimesRef.current.forEach((rt) => {
      const cfg = rt.config;
      const designH = cfg.width * rt.naturalRatio;

      const screenX = left + cfg.x * scale;
      const screenY = top + cfg.y * scale;
      const screenW = cfg.width * scale;
      const screenH = designH * scale;

      rt.element.style.width = `${screenW}px`;
      rt.element.style.height = `${screenH}px`;

      // Center points for distance math (design space)
      rt.centerX = cfg.x + cfg.width / 2;
      rt.centerY = cfg.y + designH / 2;
    });
  }, []);

  // ── Apply transform (position + parallax) ───────────────────
  const applyTransform = useCallback(
    (rt: AssetRuntime, parallaxX: number, parallaxY: number) => {
      const { left, top, scale } = containRef.current;
      const cfg = rt.config;
      const designH = cfg.width * rt.naturalRatio;

      const baseX = left + cfg.x * scale;
      const baseY = top + cfg.y * scale;

      // Parallax is calculated in design space; convert to screen px
      const px = parallaxX * scale;
      const py = parallaxY * scale;

      rt.element.style.transform = `translate(${baseX + px}px, ${baseY + py}px)`;
    },
    []
  );

  // ── RAF Loop ────────────────────────────────────────────────
  const tick = useCallback(() => {
    const designMouse = mouseRef.current
      ? pageToDesign(mouseRef.current.x, mouseRef.current.y)
      : null;

    // Normalized mouse relative to center (-1 .. 1)
    let normX = 0;
    let normY = 0;
    if (designMouse) {
      normX = (designMouse.x - DESIGN_SIZE / 2) / (DESIGN_SIZE / 2);
      normY = (designMouse.y - DESIGN_SIZE / 2) / (DESIGN_SIZE / 2);
    }

    runtimesRef.current.forEach((rt) => {
      const cfg = rt.config;

      // 1. Proximity detection
      if (designMouse) {
        const dx = designMouse.x - rt.centerX;
        const dy = designMouse.y - rt.centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        rt.targetActive = dist <= cfg.interactionRadius;
      } else {
        rt.targetActive = false;
      }

      // 2. Smooth progress
      const target = rt.targetActive ? 1 : 0;
      const rate = rt.targetActive ? RISE_RATE : FALL_RATE;
      rt.progress += (target - rt.progress) * rate;
      if (Math.abs(target - rt.progress) < 0.001) rt.progress = target;

      // 3. Frame selection
      const frame =
        Math.round(rt.progress * (cfg.frameCount - 1)) + 1;
      if (frame !== rt.currentFrame) {
        rt.currentFrame = frame;
        const img = getFrameImage(cfg.folder, frame);

        const apply = () => {
          // Guard against race conditions
          if (rt.currentFrame === frame) {
            rt.element.src = img.src;
            rt.lastRenderedFrame = frame;
          }
        };

        if (img.complete && img.naturalWidth > 0) {
          apply();
        } else {
          img.addEventListener("load", apply, { once: true });
        }

        // Pre-warm neighbors
        getFrameImage(cfg.folder, Math.min(cfg.frameCount, frame + 1));
        getFrameImage(cfg.folder, Math.max(1, frame - 1));
      }

      // 4. Parallax offset (subtle, opposite to mouse)
      const paraX = -normX * cfg.parallaxDepth * PARALLAX_FACTOR;
      const paraY = -normY * cfg.parallaxDepth * PARALLAX_FACTOR;

      // 5. Apply to DOM
      applyTransform(rt, paraX, paraY);
    });

    rafRef.current = requestAnimationFrame(tick);
  }, [getFrameImage, pageToDesign, applyTransform]);

  // ── Setup / Teardown ────────────────────────────────────────
  useEffect(() => {
    const stage = containerRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    // 1. Create DOM elements
    const runtimes: AssetRuntime[] = ASSETS.map((cfg) => {
      const img = document.createElement("img");
      img.className = "proximity-asset";
      img.style.position = "absolute";
      img.style.top = "0";
      img.style.left = "0";
      img.style.willChange = "transform, width, height";
      img.style.pointerEvents = "none";
      img.style.userSelect = "none";
      img.style.setProperty("-webkit-user-drag", "none");
      img.draggable = false;
      img.style.zIndex = String(cfg.zIndex);
      img.style.imageRendering = "-webkit-optimize-contrast";
      canvas.appendChild(img);

      return {
        config: cfg,
        progress: 0,
        targetActive: false,
        currentFrame: 1,
        lastRenderedFrame: -1,
        element: img,
        naturalRatio: 1,
        centerX: 0,
        centerY: 0,
      };
    });
    runtimesRef.current = runtimes;

    // 2. Load first frames, then start loop
    let readyCount = 0;
    const checkReady = () => {
      readyCount++;
      if (readyCount >= runtimes.length) {
        computeContain();
        layoutAssets();
        setIsReady(true);
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    runtimes.forEach((rt) => {
      const first = getFrameImage(rt.config.folder, 1);
      const onFirstLoad = () => {
        // Capture natural ratio from first frame
        if (first.naturalWidth > 0) {
          rt.naturalRatio = first.naturalHeight / first.naturalWidth;
        }
        rt.element.src = first.src;
        rt.lastRenderedFrame = 1;
        checkReady();
      };
      if (first.complete && first.naturalWidth > 0) {
        onFirstLoad();
      } else {
        first.addEventListener("load", onFirstLoad, { once: true });
      }
    });

    // 3. Event listeners
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouseRef.current = null;
    };
    const onResize = () => {
      computeContain();
      layoutAssets();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });
    window.addEventListener("resize", onResize);

    // Safety timeout in case some images fail
    const timeout = setTimeout(() => {
      if (!isReady) {
        computeContain();
        layoutAssets();
        setIsReady(true);
        rafRef.current = requestAnimationFrame(tick);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      runtimes.forEach((rt) => rt.element.remove());
    };
  }, []);

  return (
    <div className="desktop2 hero-proximity-root" ref={containerRef}>
      {/* ── Background layers (preserved) ── */}
      <div className="hero-bg" />
      <div className="hero-orb hero-orb--left" aria-hidden="true" />
      <div className="hero-orb hero-orb--right" aria-hidden="true" />
      <img
        className="gradientbg-icon"
        alt=""
        src="/allegroartisticleap/gradientbg.svg"
      />

      {/* ── Interactive sequence canvas ── */}
      <div
        className="proximity-canvas"
        ref={canvasRef}
        aria-hidden="true"
        style={{ opacity: isReady ? 1 : 0, transition: "opacity 0.6s ease" }}
      />

      {/* ── Loading indicator ── */}
      {loading && (
        <div className="proximity-loading">Loading sequences…</div>
      )}

      {/* ── Nav (preserved) ── */}
      <NavPanel onContactHover={onContactHover} />

      {/* ── Content split (preserved) ── */}
      <div className="hero-split">
        <motion.div
          className="hero-text-col"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
        >
          <motion.span
            className="hero-eyebrow"
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.18em" }}
            transition={{ duration: 1.1, delay: 0.25 }}
          >
            AI · 3D · Design · Code
          </motion.span>

          <h1 className="hero-title">
            Lalith <span>Kumar</span>
          </h1>

          <div className="hero-role-row">
            <span className="hero-role-prefix">I'm a </span>
            <RoleRotator />
          </div>

          <p className="hero-subtitle">
            Blending deep learning, generative AI, 3D environments, and visual
            design into cohesive creative &amp; technical solutions.
          </p>

          <motion.div
            className="hero-cta-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <motion.a
              href="/allegroartisticleap/LalithResume.pdf"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              View Resume
            </motion.a>
            <motion.button
              className="btn-secondary"
              onClick={() =>
                document
                  .querySelector("[data-scroll-to=projectsContainer]")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              See Projects
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll hint (preserved) ── */}
      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="hero-mouse">
          <div className="hero-mouse-wheel" />
        </div>
        <span>Scroll</span>
      </motion.div>
    </div>
  );
};

export default HeroSection;