import React, { useRef, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import "./HeroSection.css";

const OVERLAY_SCALE   = 1.20;
const OVERLAY_Y_SHIFT = -60;
const X_SHIFT_DESIGN = 470; 
const BLOOM_SPEED     = 0.04;
const CLOSE_SPEED     = 0.03;
const DESIGN_SIZE     = 1024;
const HERO_IMAGE      = "/allegroartisticleap/Hero Shot.png";

const FLOWERS = [
  { id: "left-rose",    folder: "LeftCornerFlower", frames: 86, hitX: 760, hitY: 600, hitRadius: 200 },
  { id: "right-rose",   folder: "RightFlower",      frames: 64, hitX: 380, hitY: 600, hitRadius: 200 },
  { id: "bottom-left",  folder: "ClusterCenter",    frames: 64, hitX: 460, hitY: 600, hitRadius: 160 },
  { id: "bottom-right", folder: "LeftFirstFlower",  frames: 64, hitX: 704, hitY: 600, hitRadius: 260 },
  { id: "top-feather",  folder: "feather",          frames: 48, hitX: 512, hitY: 200, hitRadius: 180 },
];

const ROLES = ["Computer Scientist", "AI Engineer", "3D Artist", "Digital Designer"];

const pad = (n: number) => String(n).padStart(6, "0");
const frameUrl = (folder: string, n: number) =>
  `/allegroartisticleap/${folder}/frame_${pad(n)}.png`;

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

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
        className="hero-showcase__role-accent"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {ROLES[index]}
      </motion.span>
    </AnimatePresence>
  );
};

/* ── Top Navigation ──────────────────────────────────────────── */
const HeroNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`hero-nav ${scrolled ? "hero-nav--scrolled" : ""}`}>
      <div className="hero-nav__brand">Lalith Kumar</div>
      <div className="hero-nav__links">
        <button onClick={() => scrollTo("[data-scroll-to=aboutContainer]")}>About</button>
        <button onClick={() => scrollTo("[data-scroll-to=section3d]")}>Projects</button>
        <button onClick={() => scrollTo(".myskills")}>Skills</button>
        <button onClick={() => scrollTo(".footer")}>Contact</button>
      </div>
    </nav>
  );
};

export default function HeroSection() {
  const stageRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const glowRef   = useRef<HTMLDivElement>(null);
  const stageRect = useRef({ left: 0, top: 0 });

  const [ready, setReady] = useState(false);
  const [debug, setDebug] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const readyRef = useRef(false);
  const mouse    = useRef<{ x: number; y: number } | null>(null);
  const contain  = useRef({ left: 0, top: 0, width: 0, height: 0, scale: 1 });
  const raf      = useRef(0);
  const cache    = useRef<Map<string, HTMLImageElement>>(new Map());
  const stateRef = useRef<
    { cfg: (typeof FLOWERS)[number]; el: HTMLImageElement; progress: number; target: number; curFrame: number }[]
  >([]);

  const getImg = useCallback((folder: string, frame: number) => {
    const key = `${folder}#${frame}`;
    if (cache.current.has(key)) return cache.current.get(key)!;
    const img = new Image();
    img.src = frameUrl(folder, frame);
    cache.current.set(key, img);
    return img;
  }, []);

  const computeContain = useCallback(() => {
    const s = stageRef.current;
    if (!s) return;
    const w = s.clientWidth;
    const h = s.clientHeight;
    const aspect = 1;
    const stageAspect = w / h;
    let rw: number, rh: number;
    if (stageAspect > aspect) { rh = h; rw = h * aspect; }
    else { rw = w; rh = w / aspect; }
    contain.current = { left: (w - rw) / 2, top: (h - rh) / 2, width: rw, height: rh, scale: rw / DESIGN_SIZE };
    const r = s.getBoundingClientRect();
    stageRect.current = { left: r.left, top: r.top };
  }, []);

  const layoutOverlays = useCallback(() => {
    const { left, top, width, height, scale } = contain.current;
    const scaledW = width * OVERLAY_SCALE;
    const scaledH = height * OVERLAY_SCALE;
    const shiftPx = X_SHIFT_DESIGN * scale;
    const offsetX = left + (width - scaledW) / 2 + shiftPx;
    const offsetY = top + (height - scaledH) / 2 + OVERLAY_Y_SHIFT;
    stateRef.current.forEach((s) => {
      s.el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      s.el.style.width = `${scaledW}px`;
      s.el.style.height = `${scaledH}px`;
    });
  }, []);

  const tick = useCallback(() => {
    const m = mouse.current;
    if (glowRef.current && m) {
      glowRef.current.style.transform = `translate(${m.x}px, ${m.y}px)`;
      glowRef.current.style.opacity = "1";
    } else if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }

    const { left, top, width, height, scale } = contain.current;
    const scaledW = width * OVERLAY_SCALE;
    const scaledH = height * OVERLAY_SCALE;
    const shiftPx = X_SHIFT_DESIGN * scale;
    const offsetX = left + (width - scaledW) / 2 + shiftPx;
    const offsetY = top + (height - scaledH) / 2 + OVERLAY_Y_SHIFT;
    const designToScreen = scale * OVERLAY_SCALE;

    stateRef.current.forEach((s) => {
      if (m) {
        const screenHitX = stageRect.current.left + offsetX + s.cfg.hitX * designToScreen;
        const screenHitY = stageRect.current.top  + offsetY + s.cfg.hitY * designToScreen;
        const screenRadius = s.cfg.hitRadius * designToScreen;
        const dx = m.x - screenHitX;
        const dy = m.y - screenHitY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        s.target = Math.max(0, 1 - dist / screenRadius);
      } else {
        s.target = 0;
      }

      const rate = s.target > s.progress ? BLOOM_SPEED : CLOSE_SPEED;
      s.progress += (s.target - s.progress) * rate;
      if (Math.abs(s.target - s.progress) < 0.001) s.progress = s.target;

      const frame = Math.round(s.progress * (s.cfg.frames - 1)) + 1;
      if (frame !== s.curFrame) {
        s.curFrame = frame;
        const img = getImg(s.cfg.folder, frame);
        if (img.complete && img.naturalWidth) {
          s.el.src = img.src;
        } else {
          img.onload = () => { if (s.curFrame === frame) s.el.src = img.src; };
        }
        getImg(s.cfg.folder, Math.min(s.cfg.frames, frame + 1));
        getImg(s.cfg.folder, Math.max(1, frame - 1));
      }
    });

    raf.current = requestAnimationFrame(tick);
  }, [getImg]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onKey = (e: KeyboardEvent) => { if (e.key === "d" || e.key === "D") setDebug(v => !v); };
    window.addEventListener("keydown", onKey);

    const states = FLOWERS.map((cfg) => {
      const el = document.createElement("img");
      el.style.position = "absolute";
      el.style.top = "0";
      el.style.left = "0";
      el.style.pointerEvents = "none";
      el.style.userSelect = "none";
      el.style.objectFit = "contain";
      el.style.willChange = "transform, opacity";
      el.draggable = false;
      canvas.appendChild(el);
      return { cfg, el, progress: 0, target: 0, curFrame: 1 };
    });
    stateRef.current = states;

    let loaded = 0;
    const tryStart = () => {
      if (loaded >= states.length) {
        computeContain();
        layoutOverlays();
        readyRef.current = true;
        setReady(true);
        raf.current = requestAnimationFrame(tick);
      }
    };

    states.forEach((s) => {
      const img = getImg(s.cfg.folder, 1);
      const onLoad = () => { s.el.src = img.src; loaded++; tryStart(); };
      const onErr = () => { console.warn(`Hero: missing ${s.cfg.folder}/frame_000001.png`); loaded++; tryStart(); };
      if (img.complete && img.naturalWidth) onLoad();
      else { img.addEventListener("load", onLoad, { once: true }); img.addEventListener("error", onErr, { once: true }); }
    });

    const timeout = setTimeout(() => {
      if (!readyRef.current) {
        computeContain();
        layoutOverlays();
        readyRef.current = true;
        setReady(true);
        raf.current = requestAnimationFrame(tick);
      }
    }, 3000);

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouse.current = null; };
    const onResize = () => { computeContain(); layoutOverlays(); };
    const onScroll = () => {
      const s = stageRef.current;
      if (!s) return;
      const r = s.getBoundingClientRect();
      stageRect.current = { left: r.left, top: r.top };
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      states.forEach((s) => s.el.remove());
    };
  }, [computeContain, layoutOverlays, tick, getImg]);

  const debugCircles = (() => {
    if (!debug) return null;
    const { left, top, width, height, scale } = contain.current;
    const scaledW = width * OVERLAY_SCALE;
    const scaledH = height * OVERLAY_SCALE;
    const shiftPx = X_SHIFT_DESIGN * scale;
    const offsetX = left + (width - scaledW) / 2 + shiftPx;
    const offsetY = top + (height - scaledH) / 2 + OVERLAY_Y_SHIFT;
    const designToScreen = scale * OVERLAY_SCALE;

    return FLOWERS.map((f) => {
      const cx = offsetX + f.hitX * designToScreen;
      const cy = offsetY + f.hitY * designToScreen;
      const r = f.hitRadius * designToScreen;
      return (
        <div key={f.id} className="hero__debug-circle" style={{ left: cx - r, top: cy - r, width: r * 2, height: r * 2 }}>
          <span>{f.id}</span>
        </div>
      );
    });
  })();

  return (
    <div className="hero-showcase">
      <HeroNav />
      <div ref={glowRef} className="hero-glow" />

      <div ref={stageRef} className="hero-showcase__stage">
        {/* Swan shifted right; left side stays clean for text */}
        <img src={HERO_IMAGE} alt="Hero" draggable={false} className="hero-showcase__image" />

        <div ref={canvasRef} className="hero-showcase__flowers" style={{ opacity: ready ? 1 : 0, transition: "opacity 0.7s ease" }} />

        {debug && <div className="hero-showcase__debug">{debugCircles}</div>}

        <div className="hero-showcase__vignette" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />

        <motion.div
          className="hero-showcase__content"
          variants={prefersReducedMotion ? {} : contentVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-showcase__grid">
            <div className="hero-showcase__headline">
              <motion.h1 className="hero-showcase__title" variants={itemVariants}>
                Lalith Kumar
              </motion.h1>
            </div>
            <div className="hero-showcase__details">
              <motion.p className="hero-showcase__summary" variants={itemVariants}>
                Blending deep learning, generative AI, 3D environments, and visual design into cohesive creative &amp; technical solutions.
              </motion.p>
              <motion.div className="hero-showcase__role" variants={itemVariants}>
                <span>I'm a</span>
                <RoleRotator />
              </motion.div>
              <motion.div className="hero-showcase__actions" variants={itemVariants}>
                <a href="/allegroartisticleap/LalithResume.pdf" target="_blank" rel="noopener noreferrer" className="hero-showcase__button hero-showcase__button--primary">
                  View Resume<span className="hero-showcase__button-icon">→</span>
                </a>
                <button onClick={() => document.querySelector("[data-scroll-to=projectsContainer]")?.scrollIntoView({ behavior: "smooth" })} className="hero-showcase__button hero-showcase__button--secondary">
                  See Projects<span className="hero-showcase__button-icon">→</span>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}