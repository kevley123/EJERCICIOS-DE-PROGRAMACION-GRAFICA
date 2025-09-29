import React, { useState, useEffect } from "react";
import { Scene, Entity } from "aframe-react";

//jpara los componentes
import TextField from "./components/TextField";
import Button from "./components/Button";

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVRMode, setIsVRMode] = useState(false);

  useEffect(() => {

    const scene = document.querySelector('a-scene');
    if (scene) {
      scene.addEventListener('enter-vr', () => setIsVRMode(true));
      scene.addEventListener('exit-vr', () => setIsVRMode(false));
    }

    if (typeof (window as any).AFRAME === 'undefined') {
      console.error('A-Frame no está cargado');
      return;
    }
  }, []);

  const handleLogin = () => {
    console.log("Login attempt:", { username, password });
    alert(`Login attempted with:\nUsuario: ${username}\nContraseña: ${password}`);
  };

  const handleRegister = () => {
    console.log("Register attempt:", { username, password });
    alert(`Register attempted with:\nUsuario: ${username}\nContraseña: ${password}`);
  };

  const handleCancel = () => {
    setUsername("");
    setPassword("");
    console.log("Operation cancelled");
  };

  return (
    <Scene>
      <Entity primitive="a-sky" src="/imagen360(2).jpg" rotation="0 -90 0" />

      <Entity primitive="a-camera" position="0 1.6 0">
        <Entity 
          primitive="a-cursor" 
          raycaster="objects: .clickable, .input-field"
          animation__click="property: scale; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
          animation__fusing="property: scale; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500"
          event-set__mouseenter="scale: 1.2 1.2 1"
          event-set__mouseleave="scale: 1 1 1"
        />
      </Entity>


      <TextField 
        label="Usuario" 
        position="0 2 -3" 
        value={username}
        onChange={setUsername}
      />


      <TextField 
        label="Contrasenia" 
        position="0 1 -3" 
        value={password}
        onChange={setPassword}
        isPassword={true}
      />

      <Button 
        label="Cancelar" 
        position="-1.5 0 -3" 
        color="#e74c3c" 
        onClick={handleCancel}
      />
      <Button 
        label="Registrar" 
        position="0 0 -3" 
        color="#f39c12" 
        onClick={handleRegister}
      />
      <Button 
        label="Login" 
        position="1.5 0 -3" 
        color="#2ecc71" 
        onClick={handleLogin}
      />


      <Entity
        primitive="a-text"
        value="Bienvenido al Login"
        color="yellow"
        align="center"
        position="0 3 -3"
        scale="2 2 2"
      />
      
      <Entity
        primitive="a-text"
        value={isVRMode ? "Modo VR Activado" : "Modo Desktop"}
        color="white"
        align="center"
        position="0 -2 -3"
        scale="1.5 1.5 1.5"
      />
    </Scene>
  );
};

export default App;