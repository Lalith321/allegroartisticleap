import { FunctionComponent, useCallback } from "react";
import "./ArtificialIntelligencePage.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faHome } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faKaggle } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';

const works = [
  {
    title: "Traffic Sign Classification",
    imageUrl: "/allegroartisticleap/Projects/traffics.png",
    description:
      "Trafic sign classification project using tensorflow. A basic customized CNN with 2 convolutions, 2 poolings are implemented and adam loss optimizer is used as feedback.",
    kaggle: "https://www.kaggle.com/code/lalith321/traffic-sign-classification",
  },
  {
    title: "AI generated Animations",
    imageUrl: "/allegroartisticleap/Projects/discriminator.png",
    description:
      "AI generated animations in a 3d space for Blender3d using deep learning GAN model. The animations were encoded in order to compress the size of data without loosing too much of information prior to feeding them as training data",
    collab:
      "https://colab.research.google.com/drive/1I3zgbRZmuHwRTK5agstVZkCKG7MgyWbS?usp=sharing",
  },
  {
    title: "Resnet Demo",
    imageUrl: "/allegroartisticleap/Projects/trafficresnet.png",
    description:
      "A fast ai resnet34 is taken as our architecture. We have trained the model with traffic signals. There is a significant increase in accuracy of 99% compared to previous custom model. Saving the model to pickle format for further usage is also demonstrated.",
    kaggle:
      "https://www.kaggle.com/code/lalith321/training-fastai-resnet-34-for-traffic-signal-data",
  },
  {
    title: "PCA for feature compression",
    imageUrl: "/allegroartisticleap/Projects/pca_implementation.png",
    description:
      "A basic approach to principal component analysis for features compression for pre processing the data, then using Decision Trees with two different criterions for training the model on iris dataset.",
    collab:
      "https://colab.research.google.com/drive/1GOpkcvqw2SfuAgO75FZvSICz1he_2J5G?usp=sharing",
  },
  {
    title: "Decision Tree Demo",
    imageUrl: "/allegroartisticleap/Projects/model_comp.png",
    description:
      "Model comparison project on network attacks data set acquired from UN. UNSW_NB15 dataset is an official data set which holds around 44 features for each network entry. Prediction of 10 types of network attacks based on the multiple supervised machine learning models were implemented.",
    collab:
      "https://colab.research.google.com/drive/1IVZ8lqfCdDuugQLLJDWzPwp4wZTJSoQT?usp=sharing",
  },
  {
    title: "Financial Data Analysis",
    imageUrl: "/allegroartisticleap/Projects/FinancialRptUSTriennial.png",
    description:
      "This is a short report based on financial data of 4.4K US companies. The dataset is available on Kaggle and the raw data consists of 4 year records for each company of decade 2020. Gross Profit, Total revenue of individual companies for each year is analyzed.",
    looker:
      "https://lookerstudio.google.com/reporting/984ba4ae-713b-4dbe-a2dc-6b46bbf376d9",
  },
  {
    title: "Organization RAG",
    imageUrl: "/allegroartisticleap/Projects/FinancialRptUSTriennial.png",
    description:
      "This project demonstrates application of Retrieval Agumented Generative AI in a small hotel. This can further be used for various purposes like storing documentations and company workflows.",
    looker:
      "/ai/ProjectHotel1",
  },
  // Add more work items as needed
];

const ArtificialIntelligencePage: FunctionComponent = () => {
  const navigate = useNavigate();
  const onButtonClick = useCallback(
    (pageId: any) => {
      navigate(pageId);
    },
    [navigate]
  );

  const routeHandler = (
    routeCollab?: string,
    routeKaggle?: string,
    routeLooker?: string
  ) => {
    const defaultRoute = "/allegroartisticleap";
    const linkButton = (
      <nav
      style={{
        position: "absolute",
        bottom: "10px",
        right: "10px",
        color: "white",
        opacity: "0.9",
        padding: "10px",
      }}>
        <Link to={routeKaggle ?? routeCollab ?? routeLooker ?? defaultRoute}>
        <FontAwesomeIcon
          icon={routeKaggle ? faKaggle : routeCollab ? faGoogle : faDatabase}
          size="2x"
        />
        </Link>
      </nav>
      // <a
      //   href={routeKaggle ?? routeCollab ?? routeLooker}
      //   style={{
      //     position: "absolute",
      //     bottom: "10px",
      //     right: "10px",
      //     color: "white",
      //     opacity: "0.9",
      //     padding: "10px",
      //   }}
      // >
      //   <FontAwesomeIcon
      //     icon={routeKaggle ? faKaggle : routeCollab ? faGoogle : faDatabase}
      //     size="2x"
      //   />
      // </a>
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
        <div className="fullpage-ai">
          <div className="scrollpage-ai">
            <div className="xblock-ai">
              {works.map((work, index) => (
                <div className="card-ai">
                  <div className="work-item-ai">
                    <img src={work.imageUrl} />
                    <h3>{work.title}</h3>
                    <div className="description-container-ai">
                      <p>{work.description}</p>
                      {/* <div>routeHandler(work.kaggle)</div> */}
                      {routeHandler(work.collab, work.kaggle, work.looker)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button id="works-button" onClick={() => onButtonClick("/env3D")}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                id="circlePath"
                d="M 5, 50 a 45,45 0 1,1 90,0 45,45 0 1,1 -90,0"
                fill="none"
              />
              <text>
                <textPath href="#circlePath" startOffset="4%">
                  3D Environments
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

export default ArtificialIntelligencePage;