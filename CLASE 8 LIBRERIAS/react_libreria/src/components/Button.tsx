import React from "react";
import { Entity } from "aframe-react";

interface ButtonProps {
  label: string;
  position: string;
  color: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, position, color, onClick }) => {
  const handleClick = () => {
    console.log(`Click en ${label}`);
    onClick();
  };

  return (
    <Entity position={position}>
      <Entity
        primitive="a-plane"
        width="1.8"
        height="0.6"
        color={color}
        opacity="0.9"
        class="clickable"
        events={{
          click: handleClick,
          mouseenter: () => document.body.style.cursor = 'pointer',
          mouseleave: () => document.body.style.cursor = 'default'
        }}
        animation__click="property: scale; from: 1 1 1; to: 0.9 0.9 1; dur: 150; startEvents: click"
        animation__hover="property: scale; from: 1 1 1; to: 1.1 1.1 1; dur: 200"
        animation__unhover="property: scale; from: 1.1 1.1 1; to: 1 1 1; dur: 200"
      >
        <Entity
          primitive="a-text"
          value={label}
          color="white"
          align="center"
          position="0 0 0.01"
          width="1.6"
        />
      </Entity>
    </Entity>
  );
};

export default Button;