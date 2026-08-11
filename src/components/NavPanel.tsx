import { FunctionComponent } from "react";
import "./NavPanel.css";

type NavPanelProps = {
  onContactHover?: (hover: boolean) => void;
};

const NavPanel: FunctionComponent<NavPanelProps> = ({ onContactHover }) => {
  const scrollToSection = (sectionID: string) => {
    const anchor = document.querySelector(`[data-scroll-to=${sectionID}]`);
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  };

  return (
    <nav
      className="navpanelfull1"
      id="NavBar"
      onMouseEnter={() => onContactHover?.(true)}
      onMouseLeave={() => onContactHover?.(false)}
    >
      {/* Brand */}
      <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <div className="nav-brand-dot" />
        <span className="nav-brand-name">Lalith Kumar</span>
      </div>

      {/* Links */}
      <div className="nav-links">
        <button
          className="nav-link-btn"
          onClick={() => scrollToSection("aboutContainer")}
        >
          About
        </button>
        <button
          className="nav-link-btn"
          onClick={() => scrollToSection("projectsContainer")}
        >
          Projects
        </button>
        <button
          className="nav-link-btn"
          onClick={() => scrollToSection("testimonialsContainer")}
        >
          Testimonials
        </button>

        {/* Hire dropdown */}
        <div className="hire-group">
          <button className="nav-link-btn">Hire ▾</button>
          <div className="nav-dropdown">
            <a
              href="https://www.fiverr.com/users/aal007"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fiverr
            </a>
            <a
              href="https://www.freelancer.com/u/Lalith321?sb=t"
              target="_blank"
              rel="noopener noreferrer"
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
