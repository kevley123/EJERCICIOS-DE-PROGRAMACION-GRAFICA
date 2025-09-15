

// api para rick and morty

//segun la documentacion de la api, se crea un interface para los datos de la ap
export interface Personaje {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
  }
  
  export async function obtenerPersonajes(): Promise<Personaje[]> {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    if (!response.ok) {
      throw new Error("Error al obtener datos de la api");
    }
    const data = await response.json();
    return data.results; // aca se guarda lso datos de la api
  }