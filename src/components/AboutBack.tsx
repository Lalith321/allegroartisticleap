import { useEffect, useRef } from "react";

// ── Tuning ────────────────────────────────────────────────────
const COUNT        = 120;
const REPEL_RADIUS = 110;   // px — mouse repulsion radius
const REPEL_FORCE  = 3.8;   // strength of push
const RETURN_SPEED = 0.045; // lerp back to home
const DAMPING      = 0.82;
const GOLD_COLORS  = ["#C9963A", "#E0B060", "#7A5C1E", "#5A4214", "#F0C878", "#A07828"];

interface Particle {
  hx: number; hy: number;   // home position
  x:  number; y:  number;   // current position
  vx: number; vy: number;   // velocity
  r:  number;               // radius
  sides: number;            // 3-8 for shards / 6 for hex
  color: string;
  alpha: number;
  rot: number;
  rotSpeed: number;
}

function hexPath(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, sides: number, rot: number) {
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const a = rot + (i / sides) * Math.PI * 2;
    const px = x + r * Math.cos(a);
    const py = y + r * Math.sin(a);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
}

// Pedestal silhouette — drawn in CSS, particles scatter around it
function buildParticles(w: number, h: number): Particle[] {
  const cx = w / 2;
  // Pedestal occupies roughly the bottom 55% of the canvas
  const pedestalTop = h * 0.3;

  const particles: Particle[] = [];
  for (let i = 0; i < COUNT; i++) {
    // Scatter particles in a broken-column shape:
    // cluster around the pedestal column area with some flying debris
    const zone = Math.random();
    let hx: number, hy: number;

    if (zone < 0.55) {
      // Column body — narrow vertical band
      const colW = w * 0.18;
      hx = cx + (Math.random() - 0.5) * colW;
      hy = pedestalTop + Math.random() * (h - pedestalTop) * 0.85;
    } else if (zone < 0.78) {
      // Base slab — wide, near bottom
      hx = cx + (Math.random() - 0.5) * w * 0.55;
      hy = h * 0.78 + Math.random() * h * 0.18;
    } else {
      // Flying debris — anywhere in upper half
      hx = Math.random() * w;
      hy = Math.random() * h * 0.65;
    }

    const r = 4 + Math.random() * 18;
    particles.push({
      hx, hy,
      x: hx + (Math.random() - 0.5) * 40,
      y: hy + (Math.random() - 0.5) * 40,
      vx: 0, vy: 0,
      r,
      sides: Math.random() < 0.4 ? 6 : 3 + Math.floor(Math.random() * 5),
      color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
      alpha: 0.08 + Math.random() * 0.32,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.012,
    });
  }
  return particles;
}

export default function PedestalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef<{ x: number; y: number } | null>(null);
  const particles = useRef<Particle[]>([]);
  const raf       = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles.current = buildParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = null; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const m = mouse.current;

      for (const p of particles.current) {
        // Repulsion
        if (m) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS && dist > 0) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Spring back to home
        p.vx += (p.hx - p.x) * RETURN_SPEED;
        p.vy += (p.hy - p.y) * RETURN_SPEED;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x  += p.vx;
        p.y  += p.vy;
        p.rot += p.rotSpeed;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle   = p.color;
        ctx.strokeStyle = p.color;
        ctx.lineWidth   = 0.8;
        hexPath(ctx, p.x, p.y, p.r, p.sides, p.rot);
        ctx.fill();
        ctx.globalAlpha = p.alpha * 0.5;
        ctx.stroke();
        ctx.restore();
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "60vh", background: "var(--color-background)", overflow: "hidden" }}>
      {/* Pedestal silhouette */}
      <svg
        viewBox="0 0 200 300"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", height: "80%", width: "auto", opacity: 0.06, pointerEvents: "none" }}
        aria-hidden="true"
      >
        {/* Capital */}
        <rect x="30" y="30" width="140" height="18" rx="3" fill="#C9963A" />
        {/* Column shaft with crack */}
        <rect x="72" y="48" width="56" height="180" fill="#C9963A" />
        {/* Crack lines */}
        <polyline points="90,80 100,110 88,140 102,170" stroke="#111" strokeWidth="3" fill="none" />
        <polyline points="110,90 104,120 112,155" stroke="#111" strokeWidth="2" fill="none" />
        {/* Base */}
        <rect x="40" y="228" width="120" height="16" rx="2" fill="#C9963A" />
        <rect x="20" y="244" width="160" height="22" rx="3" fill="#C9963A" />
      </svg>

      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "crosshair" }}
      />
    </div>
  );
}
