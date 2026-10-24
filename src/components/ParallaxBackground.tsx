import { useRef, useEffect } from "react";
import { MotionValue, useTransform, motion } from "framer-motion";

interface Props {
  scrollProgress: MotionValue<number>;
}

const pad = (n: number) => String(n).padStart(3, "0");
const frameUrl = (idx: number) => `/allegroartisticleap/timelapse2/ezgif-frame-${pad(idx)}.png`;

export default function ParallaxBackground({ scrollProgress }: Props) {
  const frameImgRef = useRef<HTMLImageElement>(null);
  const cacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const targetFrameRef = useRef<number>(1);
  const currentFrameRef = useRef<number>(1);
  const rafIdRef = useRef<number>(0);
  const isUpdatingRef = useRef<boolean>(false);
  const prevScrollIdxRef = useRef<number>(1);

  /* ── Scroll phases ── */
  const zoomPhase = useTransform(scrollProgress, [0, 0.92], [0, 1]);

  /* ── L0: Combined Background ── */
  const frameIndex = useTransform(zoomPhase, [0, 1], [1, 200]);

  /* ── Preload a frame into cache asynchronously ── */
  const preloadFrame = (idx: number): HTMLImageElement => {
    const cached = cacheRef.current.get(idx);
    if (cached) return cached;

    const img = new Image();
    img.decoding = "async";
    img.src = frameUrl(idx);
    cacheRef.current.set(idx, img);

    // Keep cache size bounded (max 50 frames) to prevent memory bloating
    if (cacheRef.current.size > 50) {
      const oldestKey = cacheRef.current.keys().next().value;
      if (oldestKey !== undefined) {
        cacheRef.current.delete(oldestKey);
      }
    }

    return img;
  };

  /* ── Render target frame smoothly ── */
  const scheduleUpdate = () => {
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    rafIdRef.current = requestAnimationFrame(() => {
      isUpdatingRef.current = false;
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      if (target === current || !frameImgRef.current) {
        return;
      }

      const img = preloadFrame(target);
      const applyFrame = () => {
        // Only apply if target hasn't changed to a newer frame in the meantime
        if (targetFrameRef.current === target && frameImgRef.current) {
          frameImgRef.current.src = img.src;
          currentFrameRef.current = target;
        }
      };

      if (img.complete && img.naturalWidth) {
        applyFrame();
      } else if ("decode" in img) {
        img.decode().then(applyFrame).catch(applyFrame);
      } else {
        img.onload = applyFrame;
      }

      // Preload next 2 frames in scroll direction
      const direction = target >= prevScrollIdxRef.current ? 1 : -1;
      prevScrollIdxRef.current = target;
      for (let i = 1; i <= 2; i++) {
        const nextIdx = target + i * direction;
        if (nextIdx >= 1 && nextIdx <= 300) {
          preloadFrame(nextIdx);
        }
      }
    });
  };

  /* ── Timelapse frame driver ── */
  useEffect(() => {
    // Initial frame preload
    preloadFrame(1);
    preloadFrame(2);

    const unsubscribe = frameIndex.on("change", (latest) => {
      const idx = Math.max(1, Math.min(300, Math.round(latest)));
      targetFrameRef.current = idx;
      scheduleUpdate();
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [frameIndex]);

  return (
    <div className="parallax-bg" aria-hidden="true">
      {/* L0: Combined Background */}
      <motion.div className="parallax-layer parallax-layer--background">
        <img
          ref={frameImgRef}
          src="/allegroartisticleap/timelapse2/ezgif-frame-001.png"
          alt=""
          decoding="async"
          draggable={false}
        />
      </motion.div>


    </div>
  );
}
