import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import ParticlesComponent from "../components/AboutBack";
import GlassmorphismComponent from "../components/GlassmorphContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArtstation,
  faGithub,
  faGoogle,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import NavPanel from "../components/NavPanel";
import SvgPathAnimation from "../components/SvgPathAnimation";

const WebPage: FunctionComponent = () => {
  return (
    <div className="landingpage-parent">
      <div className="desktop2">
        <div className="background" />
        <img
          className="gradientbg-icon"
          alt=""
          src="/allegroartisticleap/gradientbg.svg"
        />
        <img className="setlogo-icon" alt="" src="/allegroartisticleap/setlogo@2x.png" />
        <div className="blurbg" />
        <div className="glassmorph">
          <GlassmorphismComponent
            position="fixed"
            border_radius={40}
            left={undefined}
            right="0px"
            height="600px"
            width="60px"
            top="80px"
            bottom="80px"
            margin="20px"
          >
            <a href="https://github.com/Lalith321" className="github social">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a
              href="https://www.instagram.com/allegroartisticleap/"
              className="instagram social"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a
              href="https://www.linkedin.com/in/a-lalith-kumar-66606517a/"
              className="linkedin social"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a
              href="https://www.artstation.com/lalith321"
              className="artstation social"
            >
              <FontAwesomeIcon icon={faArtstation} size="2x" />
            </a>
            <a href="https://g.dev/lalith321" className="googledev social">
              <FontAwesomeIcon icon={faGoogle} size="2x" />
            </a>
            <div className="divline" />
            <a href="tel:+919840403254" className="phone social">
              <FontAwesomeIcon icon={faPhone} size="2x" />
            </a>
            <a
              href="mailto:adhimulamlalith22@gmail.com"
              className="mail social"
            >
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
          </GlassmorphismComponent>
        </div>
        <NavPanel />
      </div>
      <section className="aboutwhole" data-scroll-to="aboutContainer">
        <img className="profilepic" alt="" src="/allegroartisticleap/ProfilePic.png" />
        <img className="profilemask" src="/allegroartisticleap/profilemask.png" />
        <div className="particlescontainer">
          <ParticlesComponent columns={36} rows={24} />
        </div>
        <div className="about-frame">
          <div className="about">About</div>
        </div>
        <div className="aboutcontent-wrapper">
          <div className="aboutcontent">
            "As a versatile professional, my background includes a solid
            foundation in computer science, encompassing data science, machine
            learning, and Google Cloud certifications. Specializing in
            convolutional neural networks, generative AI, and deep learning, my
            passion drives me. On the creative side, I excel as a digital
            artist, proficient in crafting captivating digital art, 3D modeling,
            and animations. The fusion of technical expertise and creative flair
            defines my approach, resulting in innovative and visually stunning
            projects."
          </div>
          <a href="/allegroartisticleap/LalithResume.pdf">Know more....</a>
        </div>
      </section>
      <div className="myprojects" data-scroll-to="projectsContainer">
        <SvgPathAnimation />
        <div className="supertext">Know My Skills</div>
      </div>
      <section className="myskills">
        <img
          src="/allegroartisticleap/BackDropSkills.png"
          alt=""
          className="myskillsbg"
        />
        <img src="/allegroartisticleap/SkillsBg2.png" alt="" className="myskillsbg2" />
        <GlassmorphismComponent
          position="absolute"
          border_radius={40}
          left="60px"
          right={undefined}
          height="600px"
          width="1280px"
          top="10%"
          bottom="0px"
          margin="20px"
        >
          <div className="skilldisplay">
            <div className="technical">
              Tensorflow | Docker | Python | C# | Java | Neural Network | Data
              Science | Power Bi | Machine Learning | Data Analytics |
              Generative Adversial Neural Network | GCP | Deep Learning |
              Robotics Operating System | React | Android Studio | Fusion360
            </div>
            <div className="artistic">
              Blender 3D | Quixel mixer | Sculpting | Figma | Logo Design |
              Krita | Portraits | Photoshop | Unreal Engine | Concept Art |
              Animations | Cascadeur
            </div>
          </div>
        </GlassmorphismComponent>
      </section>
      <section className="footer">
        <div className="donate-box">
          <h3>Donate</h3>
          <img className="qrimage" src="/allegroartisticleap/PaymentQR.jpg" />
        </div>
      </section>
    </div>
    // Privacy Policy and Terms and conditions
  );
};

export default WebPage;
