import { FunctionComponent, useCallback } from "react";
import "./WebPage1.css";
import ParticlesComponent from "../components/AboutBack";

const WebPage1: FunctionComponent = () => {
  const onFrameButtonClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='aboutContainer']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);
  return (
    <div className="landingpage-parent">
      <div className="desktop2">
        <div className="background" />
        <img className="gradientbg-icon" alt="" src="/gradientbg.svg" />
        <img className="setlogo-icon" alt="" src="/setlogo@2x.png" />
        <div className="blurbg" />
        <nav className="navpanelfull1" id="NavBar">
          <div className="navpanel1" />
          <button className="about-container" onClick={onFrameButtonClick}>
            <div className="about1">About</div>
          </button>
          <div className="arts-group">
            <div className="arts1">Arts</div>
            <div className="frame-parent1">
              <div className="cuisine-container">
                <div className="listelement">Cuisine</div>
              </div>
              <div className="nft-container">
                <div className="listelement">NFT</div>
              </div>
              <div className="concept-container">
                <div className="listelement">Concept</div>
              </div>
              <div className="portrait-container">
                <div className="listelement">Portrait</div>
              </div>
            </div>
          </div>
          <div className="science-group">
            <div className="arts1">Science</div>
            <div className="frame-parent2">
              <div className="datascience-container">
                <div className="listelement">Data Science</div>
              </div>
              <div className="dsandalgo-container">
                <div className="listelement">DS and Algo</div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <section className="aboutwhole" data-scroll-to="aboutContainer">
        <div className="particlescontainer">
          <ParticlesComponent columns={60} rows={20} />
        </div>
        <div className="about-frame">
          <div className="about">About</div>
        </div>
        <div className="aboutcontent-wrapper">
          <div className="aboutcontent">
            I am a versatile professional with a unique blend of skills in both
            computer science and digital arts. My educational background
            encompasses a solid foundation in computer sciences, where I have
            completed projects in data science and machine learning, as well as
            obtained certifications in Google Cloud technologies. My true
            passion lies in convolutional neural networks, generative AI and
            deep learning, which I find particularly fascinating and have
            pursued extensively. On the creative side, I am an accomplished
            digital artist skilled in producing captivating digital portraits,
            landscapes, 3D modeling, and animations. In both fields, I leverage
            a diverse range of tools to bring my projects to life, combining
            technical expertise with a strong creative flair to deliver
            innovative and visually stunning results.
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebPage1;
