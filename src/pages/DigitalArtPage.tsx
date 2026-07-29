import { FunctionComponent, useRef, useState } from "react";
import "./DigitalArtPage.css";
import { motion } from "framer-motion";
import { pageTransition } from "../motionVariants";
import { useNavigate } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const works = [
  {
    title: "Portrait",
    imageUrl: "/allegroartisticleap/Arts/Subha.png",
    imageMockUp: "/allegroartisticleap/Arts/SubhaMockUp.png",
  },
  {
    title: "Portrait",
    imageUrl: "/allegroartisticleap/Arts/Donya.png",
    imageMockUp: "/allegroartisticleap/Arts/DonyaMockUp.png",
  },
  {
    title: "Portrait",
    imageUrl: "/allegroartisticleap/Arts/Dhara.png",
    imageMockUp: "/allegroartisticleap/Arts/DharaMockUp.png",
  },
  {
    title: "Portrait",
    imageUrl: "/allegroartisticleap/Arts/Yeonjun.png",
    imageMockUp: "/allegroartisticleap/Arts/YeonjunMockUp.png",
  },
  {
    title: "Portrait",
    imageUrl: "/allegroartisticleap/Arts/Heva.png",
    imageMockUp: "/allegroartisticleap/Arts/HevaMockUp.png",
  },
  {
    title: "Logo",
    imageUrl: "/allegroartisticleap/Arts/EC4You.png",
    imageMockUp: "",
  },
  {
    title: "Logo",
    imageUrl: "/allegroartisticleap/Arts/FreshCoastalCleaners.png",
    imageMockUp: "",
  },
  {
    title: "Concept Art",
    imageUrl: "/allegroartisticleap/Arts/AngelOnEarth2.png",
    imageMockUp: "/allegroartisticleap/Arts/AngelOnEarth2MockUp.png",
  },
  {
    title: "Concept Art",
    imageUrl: "/allegroartisticleap/Arts/Sravan1.png",
    imageMockUp: "/allegroartisticleap/Arts/Sravan1MockUp.png",
  },
  {
    title: "Concept Art",
    imageUrl: "/allegroartisticleap/Arts/Harshith2.png",
    imageMockUp: "/allegroartisticleap/Arts/Harshith2MockUp.png",
  },
  {
    title: "Concept Art",
    imageUrl: "/allegroartisticleap/Arts/Lalith1.png",
    imageMockUp: "/allegroartisticleap/Arts/Lalith1MockUp.png",
  },
  {
    title: "Photography",
    imageUrl: "/allegroartisticleap/Arts/PlantsNight.png",
    imageMockUp: "/allegroartisticleap/Arts/PlantsNightMockUp.png",
  },
  // Add more work items as needed
];

const DigitalArtPage: FunctionComponent = () => {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const navigate = useNavigate();

  const scrollPage_daWidth =
    document.querySelector(".scrollpage-da")?.clientWidth;
  const paddingRight = scrollPage_daWidth! - 320;

  function handleScroll(): void {
    if (scrollElementRef.current) {
      const scrollLeft = scrollElementRef.current.scrollLeft;
      const newIndex = Math.floor(scrollLeft / 320);
      setFocusedIndex(newIndex);
    }
  }

  return (
    <div className="dummy-bg">
      <motion.div
        initial={{ rotateZ: 90, opacity: 0, transformOrigin: "100% 100%" }}
        animate={{ rotateZ: 0, opacity: 1 }}
        exit={{ rotateZ: -90, opacity: 0, transformOrigin: "100% 100%" }}
        transition={pageTransition}
      >
        <div className="fullpage-da">
          <img
            className="master-display-da"
            src={works[focusedIndex]?.imageMockUp || ""}
            alt=""
          />
          <div
            className="scrollpage-da"
            onScroll={handleScroll}
            ref={scrollElementRef}
          >
            <div className="xblock-da" style={{ paddingRight: paddingRight }}>
              {works.map((work) => (
                <div className="card-da" key={work.imageUrl}>
                  <div className="work-item-da">
                    <img src={work.imageUrl} alt={work.title} />
                    <h3>{work.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button id="works-button" onClick={() => navigate("/programs")}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                id="circlePath"
                d="M 5, 50 a 45,45 0 1,1 90,0 45,45 0 1,1 -90,0"
                fill="none"
              />
              <text>
                <textPath href="#circlePath" startOffset="6%">
                  Programming
                </textPath>
              </text>
            </svg>
          </button>
        </div>
      </motion.div>
      <button id="home-button" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHome} className="home-button-icon" />
      </button>
    </div>
  );
};

export default DigitalArtPage;
