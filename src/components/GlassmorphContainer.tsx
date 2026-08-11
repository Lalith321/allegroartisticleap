import { FunctionComponent, ReactNode } from "react";
import "./GlassmorphContainer.css";

interface GlassMorphProps {
  position: "static" | "fixed" | "absolute" | "relative";
  border_radius: number;
  margin: string | undefined;
  left: string | undefined;
  right: string | undefined;
  height: string;
  width: string;
  top: string;
  bottom: string;
  children?: ReactNode;
}

const GlassmorphismComponent: React.FC<GlassMorphProps> = ({
  position,
  margin,
  border_radius,
  left,
  right,
  height,
  width,
  top,
  bottom,
  children,
}) => {
  const cardContainerStyle: React.CSSProperties = {
    position: position,
    margin: margin,
    borderRadius: border_radius + "px",
    height: height,
    width: width,
    top: top,
    left: left,
    right: right,
    bottom: bottom,
  };

  const cardStyle: React.CSSProperties = {
    backdropFilter: "blur(10px)",
    borderRadius: border_radius + "px",
    height: height,
    top: "0px",
  };

  return (
    <div className="glassmorphism-container" style={cardContainerStyle}>
      <div className="glassmorphism-card" style={cardStyle}>
        {children}
      </div>
    </div>
  );
};

export default GlassmorphismComponent;
