import { returnStatement } from "@babel/types";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./NavPanel.css";

const NavPanel: FunctionComponent = () => {
  const scrollToSection = (sectionID: any) => {
    // You can call the scroll function when the component mounts or at a certain event.
    const anchor = document.querySelector(`[data-scroll-to=${sectionID}]`);
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  };

  return (
    <nav className="navpanelfull1" id="NavBar">
      <div className="navpanel1" />
      <button
        className="about-container"
        onClick={() => scrollToSection("aboutContainer")}
      >
        <div className="about1">About</div>
      </button>
      <button
        className="projects-container"
        onClick={() => scrollToSection("projectsContainer")}
      >
        <div className="projects1">Projects</div>
      </button>
      {/* <div className="arts-group">
        <div className="arts1">Arts</div>
        <div className="frame-parent1">
          <div
            className="cuisine-container"
            onClick={() => scrollToSection("cuisineContainer")}
          >
            <div className="listelement">Cuisine</div>
          </div>
          <div
            className="nft-container"
            onClick={() => scrollToSection("nftContainer")}
          >
            <div className="listelement">NFT</div>
          </div>
          <div
            className="concept-container"
            onClick={() => scrollToSection("conceptContainer")}
          >
            <div className="listelement">Concept</div>
          </div>
          <div
            className="portraits-container"
            onClick={() => scrollToSection("portraitsContainer")}
          >
            <div className="listelement">Portraits</div>
          </div>
        </div>
      </div> */}
      <div className="hire-group">
        <div className="hire1">Hire</div>
        <div className="frame-parent2">
          <div className="upwork-container">
            <a
              href="https://www.fiverr.com/users/aal007"
              className="listelement"
            >
              Fiverr
            </a>
          </div>
          <div className="freelancer-container">
            <a
              href="https://www.freelancer.com/u/Lalith321?sb=t"
              className="listelement"
            >
              Freelancer
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavPanel;
