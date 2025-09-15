import React from "react";
import ModeloLista from "./components/ModeloLista";

const App: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Consumo de datos de api en react</h1>
      <ModeloLista />
    </div>
  );
};

export default App;
