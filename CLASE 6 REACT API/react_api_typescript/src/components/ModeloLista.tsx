import React, { useEffect, useState } from "react";
import { obtenerPersonajes } from "../service/SketchfabService";
import type { Personaje } from "../service/SketchfabService";

const ModeloLista: React.FC = () => {
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerPersonajes();
        setPersonajes(data);
      } catch (e) {
        console.error(e);
      } finally {
        setCargando(false);
      }
    };
    fetchData();
  }, []);

  if (cargando) return <p>Cargando</p>;

  return (
    <div>
      <h2>Api de Rick and Morty</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {personajes.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              width: "200px",
              textAlign: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{p.name}</h3>
            <p>Estado: {p.status}</p>
            <p>Especie: {p.species}</p>
            <p>Género: {p.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeloLista;
