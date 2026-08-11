import React, { FunctionComponent } from "react";
import "./SvgButton.css";

interface SvgButtonProps {
  onClick: () => void;
  svg: React.ReactNode;
}

const SvgButton: FunctionComponent<SvgButtonProps> = ({ onClick, svg }) => (
  <div className="property-onpress" onClick={onClick}>
    {svg}
  </div>
);

export default SvgButton;
