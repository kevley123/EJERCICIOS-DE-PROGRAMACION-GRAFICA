import React, { useState, useEffect } from "react";
import { Entity } from "aframe-react";

interface TextFieldProps {
  label: string;
  position: string;
  value: string;
  onChange: (value: string) => void;
  isPassword?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ 
  label, 
  position, 
  value, 
  onChange,
  isPassword = false 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleClick = () => {
    if (!isFocused) {
      const newValue = prompt(`Ingrese ${label}:`, inputValue);
      if (newValue !== null) {
        setInputValue(newValue);
        onChange(newValue);
      }
    }
    setIsFocused(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isFocused) {
      if (event.key === 'Backspace') {
        const newValue = inputValue.slice(0, -1);
        setInputValue(newValue);
        onChange(newValue);
      } else if (event.key === 'Enter') {
        setIsFocused(false);
      } else if (event.key.length === 1) {
        const newValue = inputValue + event.key;
        setInputValue(newValue);
        onChange(newValue);
      }
    }
  };

  useEffect(() => {
    if (isFocused) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFocused, inputValue]);

  const displayValue = isPassword && inputValue ? '*'.repeat(inputValue.length) : inputValue;

  return (
    <Entity position={position}>
      <Entity
        primitive="a-text"
        value={label}
        color="white"
        align="center"
        position="0 0.8 0"
        scale="1.5 1.5 1.5"
      />
      <Entity
        primitive="a-plane"
        width="2.5"
        height="0.6"
        color={isFocused ? "#3498db" : "#ecf0f1"}
        opacity="0.9"
        class="clickable input-field"
        events={{
          click: handleClick,
          mouseenter: () => document.body.style.cursor = 'pointer',
          mouseleave: () => document.body.style.cursor = 'default'
        }}
        animation__hover="property: scale; from: 1 1 1; to: 1.05 1.05 1; dur: 200"
        animation__unhover="property: scale; from: 1.05 1.05 1; to: 1 1 1; dur: 200"
      >
        <Entity
          primitive="a-text"
          value={displayValue || "Click para escribir"}
          color={inputValue ? "black" : "#7f8c8d"}
          align="center"
          position="0 0 0.01"
          width="2"
        />
        
        {isFocused && (
          <Entity
            primitive="a-plane"
            width="0.1"
            height="0.4"
            color="#e74c3c"
            position="1 0 0.02"
            animation="property: position; to: -1 0 0.02; dur: 1000; loop: true"
          />
        )}
      </Entity>
      
      {isFocused && (
        <Entity
          primitive="a-text"
          value="Escribe en tu teclado. Enter para terminar."
          color="#f1c40f"
          align="center"
          position="0 -0.8 0"
          scale="1 1 1"
        />
      )}
    </Entity>
  );
};

export default TextField;