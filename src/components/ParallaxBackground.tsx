import { useRef, useEffect } from "react";
import { MotionValue, useTransform, motion } from "framer-motion";

interface Props {
  scrollProgress: MotionValue<number>;
}

const pad = (n: number) => String(n).padStart(3, "0");

export default function ParallaxBackground({ scrollProgress }: Props) {
  const frameImgRef = useRef<HTMLImageElement>(null);
  const cacheRef = useRef<Set<string>>(new Set());

  /* ── Scroll phases ── */
  const zoomPhase = useTransform(scrollProgress, [0, 0.92], [0, 1]);
  const exitPhase = useTransform(scrollProgress, [0.92, 1], [0, 1]);

  /* ── L0: Combined Background ── */
  const frameIndex = useTransform(zoomPhase, [0, 1], [1, 200]);

  const rockScale = useTransform(zoomPhase, [0.65, 1.0], [2.0, 1.4]);
  const rockY = useTransform(zoomPhase, [0.65, 1], ["100%", "0%"]);
  const rockOpacity = useTransform(zoomPhase, [0.65, 1], [1, 1]);

  /* Exit: gentle lift + fade, darkness rises smoothly underneath */
  const rockExitY = useTransform(exitPhase, [0, 1], ["0%", "-20%"]);
  const rockExitOpacity = useTransform(exitPhase, [0, 0.55], [1, 0]);
  const darknessOpacity = useTransform(exitPhase, [0, 0.55], [0, 1]);

  /* ── Timelapse frame driver ── */
  useEffect(() => {
    return frameIndex.on("change", (latest) => {
      const idx = Math.max(1, Math.min(300, Math.round(latest)));
      const src = `/allegroartisticleap/timelapse2/ezgif-frame-${pad(idx)}.png`;

      if (frameImgRef.current) {
        frameImgRef.current.src = src;
      }

      /* Preload next 3 frames */
      for (let i = 1; i <= 3; i++) {
        const next = idx + i;
        if (next > 300) break;
        const url = `/allegroartisticleap/timelapse2/ezgif-frame-${pad(next)}.png`;
        if (!cacheRef.current.has(url)) {
          const img = new Image();
          img.src = url;
          cacheRef.current.add(url);
        }
      }
    });
  }, [frameIndex]);

  return (
    <div className="parallax-bg" aria-hidden="true">
      {/* L0: Combined Background */}
      <motion.div className="parallax-layer parallax-layer--background">
        <img
          ref={frameImgRef}
          src="/allegroartisticleap/timelapse2/ezgif-frame-001.png"
          alt=""
          draggable={false}
        />
      </motion.div>

      {/* L1: Rock */}
      <motion.div
        className="parallax-layer parallax-layer--rock"
        style={{
          scale: rockScale,
          y: rockY,
          opacity: rockOpacity,
        }}
      >
        <motion.div
          className="parallax-layer--rock__inner"
          style={{ y: rockExitY, opacity: rockExitOpacity }}
        >
          <img src="/allegroartisticleap/rock.png" alt="" draggable={false} />
        </motion.div>
      </motion.div>

      {/* Darkness overlay for final transition */}
      <motion.div
        className="parallax-darkness"
        style={{ opacity: darknessOpacity }}
      />
    </div>
  );
}