import { FunctionComponent, useCallback, useRef, useState } from "react";
import "./Env3DPage.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import YouTubeHandler from "../components/YouTubeHandler";

const works = [
  {
    imageUrl: "/allegroartisticleap/Arts/SeaPavillion.png",
    videoIdStr: "vwaqvr3IaQE",
  },
  {
    imageUrl: "/allegroartisticleap/Arts/HistoryPart1.png",
    videoIdStr: "7gp6qptenNw",
  },
  {
    imageUrl: "/allegroartisticleap/Arts/MandalaCave.png",
    videoIdStr: "",
  },
  {
    imageUrl: "/allegroartisticleap/Arts/rock.png",
    videoIdStr: "",
  },
  {
    imageUrl: "/allegroartisticleap/Arts/Wearables.png",
    videoIdStr: "B0XHBEvEKRE",
  },
  {
    imageUrl: "/allegroartisticleap/Arts/RedCrystalParticles.png",
    videoIdStr: "PHm-lS7Oryw",
  },
  {
    imageUrl: "/allegroartisticleap/Arts/GoldEmitterAbstract.png",
    videoIdStr: "XdOy250dNjs",
  },
  // Add more work items as needed
];

const Env3DPage: FunctionComponent = () => {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const cardContainerElementRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const navigate = useNavigate();

  const onButtonClick = useCallback(
    (pageId: any) => {
      navigate(pageId);
    },
    [navigate]
  );

  const scrollPage_envWidth =
    document.querySelector(".scrollpage-env")?.clientWidth;
  // 320 px is the width of appearing individual card + left right padding i.e. card-env.
  const paddingRight = scrollPage_envWidth! - 320;

  function handleScroll(): void {
    if (scrollElementRef.current) {
      const scrollLeft = scrollElementRef.current.scrollLeft;
      const newIndex = Math.floor(scrollLeft / 320);
      setFocusedIndex(newIndex);
      // console.log(newIndex);
      // console.log(scrollLeft);
    }
    // throw new Error("Function not implemented.");
  }

  return (
    <div className="dummy-bg">
      <motion.div
        initial={{ rotateZ: 90, opacity: 0, transformOrigin: "100% 100%" }}
        animate={{ rotateZ: 0, opacity: 1 }}
        exit={{ rotateZ: -90, opacity: 0, transformOrigin: "100% 100%" }}
        transition={{ duration: 2 }}
      >
        <div className="fullpage-env">
          <div className="cinematic-bg">
            <YouTubeHandler videoIdStr={works[focusedIndex].videoIdStr} />
          </div>
          <div
            className="scrollpage-env"
            onScroll={handleScroll}
            ref={scrollElementRef}
          >
            <div className="xblock-env" style={{ paddingRight: paddingRight }}>
              {works.map((work, index) => (
                <div className="card-env">
                  <div className="work-item-env">
                    <img src={work.imageUrl} />
                    {/* <h3>{work.title}</h3> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            id="works-button"
            onClick={() => onButtonClick("/digitalart")}
          >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                id="circlePath"
                d="M 5, 50 a 45,45 0 1,1 90,0 45,45 0 1,1 -90,0"
                fill="none"
              />
              <text>
                <textPath href="#circlePath" startOffset="8%">
                  Digital Art
                </textPath>
              </text>
            </svg>
          </button>
        </div>
      </motion.div>
      <button id="home-button" onClick={() => onButtonClick("/")}>
        <FontAwesomeIcon icon={faHome} className="home-button-icon" />
      </button>
    </div>
  );
};

export default Env3DPage;
