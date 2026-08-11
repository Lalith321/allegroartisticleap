import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Particles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import "./AboutBack.css";
import {
  Container,
  Engine,
  ICoordinates,
  Particle,
  Vector,
  getDistances,
} from "tsparticles-engine";


const ParticlesComponent: FunctionComponent = () => {
  const originRef = useRef<ICoordinates[]>([]);
  const containerRef = useRef<Container | undefined>(undefined);
  const rafRef = useRef<number | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const handleLoaded = useCallback(async (container: Container | undefined) => {
    if (!container) return;
    containerRef.current = container;

    // Wait a couple of frames so tsparticles has fully placed all particles
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const origins: ICoordinates[] = [];
        let id = 0;
        let particle: Particle | undefined;
        while ((particle = container.particles.find((p) => p.id === id))) {
          const pos = particle.getPosition();
          origins.push({ x: pos.x, y: pos.y });
          id++;
        }
        originRef.current = origins;
        setLoaded(true);
      });
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const loop = () => {
      const container = containerRef.current;
      const origins = originRef.current;
      if (container && origins.length > 0) {
        origins.forEach((home, i) => {
          const particle = container.particles.find((p) => p.id === i);
          if (!particle) return;

          const { dx, dy, distance } = getDistances(home, particle.getPosition());
          const wanderRadius = 60; // px — free drift zone, no pull inside

          if (distance > wanderRadius) {
            const pull = Math.min((distance - wanderRadius) * 0.003, 0.5);
            const ux = dx / distance;
            const uy = dy / distance;
            particle.velocity.addTo(Vector.create(ux * pull, uy * pull));
          }
        });
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded]);

  return (
    <Particles
      id="about-hexagon-particles"
      init={particlesInit}
      loaded={handleLoaded}
      options={{
        detectRetina: false,
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          number: {
            value: 38,
            density: { enable: true, area: 800 },
          },
          color: { value: ["#7A5C1E", "#C9963A", "#5A4214", "#E0B060"] },
          opacity: {
            value: { min: 0.08, max: 0.38 },
            animation: { enable: true, speed: 0.3, sync: false },
          },
          shape: {
            type: "polygon",
            options: { polygon: { sides: 6 } },
          },
          size: {
            value: { min: 8, max: 22 },
            animation: { enable: false },
          },
          move: {
            enable: true,
            speed: 0.35,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "bounce" },
            decay: 0.008,
            warp: false,
          },
          rotate: {
            value: { min: 0, max: 360 },
            animation: { enable: true, speed: 1.2, sync: false },
          },
        },
        interactivity: {
          detectsOn: "canvas" as const,
          events: {
            onHover: { enable: false },
            resize: true,
          },
        },
      }}
    />
  );
};

export default ParticlesComponent;
