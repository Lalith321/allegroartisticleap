import { FunctionComponent, useCallback, useState } from "react";
import { Particles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import "./AboutBack.css";
import {
  Container,
  Engine,
  ICoordinates,
  Vector,
  Particle,
  getDistances,
} from "tsparticles-engine";

interface HexagonGridProps {
  columns: number;
  rows: number;
}

// Note: Get current position for each particle
// container.particles.find((particle) => particle.id === 0)?.getPosition().x ?? 0
// container.particles.find((particle) => particle.id === 0)?.getPosition().y ?? 0

const ParticlesComponent: FunctionComponent<HexagonGridProps> = ({
  columns,
  rows,
}) => {
  const [originalPositions, setOriginalPositions] = useState<ICoordinates[]>(
    []
  );
  const [particlesLoaded, setParticlesLoaded] = useState(false);
  const [container, setContainer] = useState<Container | undefined>(undefined);

  const particlesInit = useCallback(async (engine: Engine) => {
    // console.log("Check Engine", engine);
    await loadSlim(engine);
  }, []);

  const handleParticlesLoaded = useCallback(
    async (container: Container | undefined) => {
      if (container) {
        // console.log("Container Loaded", container);
        const customParticles: ICoordinates[] = [];
        for (let i = 0; i < columns; i++) {
          for (let j = 0; j < rows; j++) {
            let y;
            if (i % 2 === 0) {
              y = j * 10 * 4 + 4;
            } else {
              y = j * 10 * 4 + 24;
            }
            const x = i * 8 * 4;
            customParticles.push({ x, y });
          }
        }
        //Setting array of particles with x, y coordinates as state variable
        setOriginalPositions(
          customParticles.map((particle) => ({ x: particle.x, y: particle.y }))
        );
        customParticles.forEach((particle) => {
          container.particles.addParticle(particle);
        });
        setContainer(container);
        setParticlesLoaded(true);
      }
    },
    []
  );

  function findChangedParticles(
    originalPositions: ICoordinates[],
    container: Container
  ) {
    if (container && particlesLoaded) {
      for (let index = 0; index < rows * columns; index++) {
        const particle = container.particles?.find(
          (particle) => particle.id === index
        )!;
        const originalPosition = originalPositions[index];
        const currentPosition = particle?.getPosition();
        if (
          Math.abs(originalPosition.x - currentPosition?.x) > 0.04 &&
          Math.abs(originalPosition.y - currentPosition?.y) > 0.04
          // originalPosition.x !== currentPosition?.x ||
          // originalPosition.y !== currentPosition?.y
        ) {
          moveParticlesBack(index, originalPositions, particle);
        }
      }
    }
  }

  const moveParticlesBack = (
    index: number,
    originalPositions: ICoordinates[],
    particle: Particle
  ) => {
    // console.log("Animation in progress");
    const speed = 0.2;
    // Get the difference of x-coords, y-coords, distance. They help further in calculating unit vectors. Distance acts as magnitude.
    // Note: initial position should be the first argument and current position should be second argument as sign(-,+) plays a major role in deciding the vector direction.
    const { dx, dy, distance } = getDistances(
      originalPositions[index],
      particle.getPosition()
    );
    const unitVector = { x: dx / distance, y: dy / distance };
    // Somehow we are not getting the particle to set to exact same position but this approach to get vector minimizes the difference between target and initial positions.
    // Position property has addTo medthod which takes the vector as input and adds the particle to updated position.
    particle.position.addTo(
      Vector.create(unitVector.x * speed, unitVector.y * speed)
    );
  };

  // Checks for paricle position changed
  if (container) {
    setInterval(() => findChangedParticles(originalPositions, container), 1);
  }

  const particleConfig = {
    detectRetina: true,
    particles: {
      opacity: {
        random: true, // Adds randomness to opacity
      },
      color: {
        value: "#4c0c1b",
      },
      links: {
        color: "#ff333f",
        enable: false,
        opacity: 0.5,
        width: 1,
      },
      shape: {
        type: "polygon",
        options: {
          polygon: {
            sides: 6,
          },
        },
      },
      size: {
        animation: {
          enable: false,
        },
        value: 12,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "attract",
        },
      },
      modes: {
        attract: {
          distance: 200,
          speed: 2,
        },
      },
    },
  };

  return (
    <Particles
      id="hexagon-particles"
      init={particlesInit}
      loaded={handleParticlesLoaded}
      options={particleConfig}
    />
  );
};

export default ParticlesComponent;
