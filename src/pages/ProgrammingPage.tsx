import { FunctionComponent, useCallback } from "react";
import "./ProgrammingPage.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const works = [
  {
    title: "Movie Ticket Registaration",
    imageUrl: "/allegroartisticleap/Projects/ticketregistration.png",
    description:
      "A C++ project that lets user to book a ticket for movies. It enables user to select type of screen, reserve seats and also view the number of screens available",
    github: "https://github.com/Lalith321/MovieTicketRegistrationC-.git",
  },
  {
    title: "Prims MST code",
    imageUrl: "/allegroartisticleap/Projects/primsalgo.png",
    description:
      "A basic overview of Prims minimum spanning tree. It has the input graph preprogrammed. The main function takes the graph and creates the shortest path that it takes to visit all the nodes in graph.",
    github: "https://github.com/Lalith321/Algorithms.git",
  },
  // Add more work items as needed
];

const ProgrammingPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const onButtonClick = useCallback(
    (pageId: any) => {
      navigate(pageId);
    },
    [navigate]
  );

  const routeHandler = (routeGithub: string) => {
    const linkButton = (
      <a
        href={routeGithub}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          color: "white",
          opacity: "0.9",
          padding: "10px",
        }}
      >
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
    );
    return linkButton;
  };

  return (
    <div className="dummy-bg">
      <motion.div
        initial={{ rotateZ: 90, opacity: 0, transformOrigin: "100% 100%" }}
        animate={{ rotateZ: 0, opacity: 1 }}
        exit={{ rotateZ: -90, opacity: 0, transformOrigin: "100% 100%" }}
        transition={{ duration: 2 }}
      >
        <div className="fullpage-pg">
          <div className="scrollpage-pg">
            <div className="xblock-pg">
              {works.map((work, index) => (
                <div className="card-pg">
                  <div className="work-item-pg">
                    <img src={work.imageUrl} />
                    <h3>{work.title}</h3>
                    <div className="description-container-pg">
                      <p>{work.description}</p>
                      {routeHandler(work.github)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button id="works-button" onClick={() => onButtonClick("/ai")}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                id="circlePath"
                d="M 5, 50 a 45,45 0 1,1 90,0 45,45 0 1,1 -90,0"
                fill="none"
              />
              <text>
                <textPath href="#circlePath" startOffset="3%">
                  Artificial Intelligence
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

export default ProgrammingPage;
