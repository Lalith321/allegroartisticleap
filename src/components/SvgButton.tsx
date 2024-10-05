import React, { FunctionComponent } from "react";
import "./SvgButton.css";

interface SvgButtonProps {
  onClick: () => void;
  svg: React.ReactNode;
}

const SvgButton: FunctionComponent<SvgButtonProps> = ({ onClick, svg }) => {
  const handleButtonClick = () => {
    // Handle the button click event
    if (onClick) {
      onClick();
    }
  };

  return ( 
    <div className="property-onpress" onClick={handleButtonClick}>
      {svg}
    </div>
  );
};

export default SvgButton;
