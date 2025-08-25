const inputLimite = document.getElementById("limite");
const botonGenerar = document.getElementById("generar");
const salida = document.getElementById("salida");

const inputParrafo = document.getElementById("parrafo");
const inputPalabra = document.getElementById("palabra");
const botonBuscar = document.getElementById("buscar");
const resultadoBusqueda = document.getElementById("resultadoBusqueda");

function crearWorker(fn) {
  const blob = new Blob(["onmessage = " + fn.toString()], { type: "application/javascript" });
  const url = URL.createObjectURL(blob);
  return new Worker(url);
}

/* worker de los primso xd */
function workerPrimos(e) {
  const limite = e.data;
  const esPrimo = Array(limite + 1).fill(true);
  esPrimo[0] = esPrimo[1] = false;

  for (let i = 2; i * i <= limite; i++) {
    if (esPrimo[i]) {
      for (let j = i * i; j <= limite; j += i) {
        esPrimo[j] = false;
      }
    }
  }

  const primos = [];
  for (let i = 2; i <= limite; i++) {
    if (esPrimo[i]) primos.push(i);
  }

  postMessage(primos.join(", "));
}

/* para buscar la palabra*/
function workerBusqueda(e) {
  const { parrafo, palabra } = e.data;
  const listaPalabras = parrafo.split(/\s+/).sort();

  let inicio = 0;
  let fin = listaPalabras.length - 1;
  let posicion = -1;

  while (inicio <= fin) {
    let medio = Math.floor((inicio + fin) / 2);
    if (listaPalabras[medio] === palabra) {
      posicion = medio;
      break;
    }
    if (listaPalabras[medio] < palabra) {
      inicio = medio + 1;
    } else {
      fin = medio - 1;
    }
  }

  if (posicion !== -1) {
    postMessage(`La palabra '${palabra}' si esta en el texto`);
  } else {
    postMessage(`La palabra '${palabra}' NO se encontró.\nLista: ${listaPalabras.join(", ")}`);
  }
}

/* para los botones*/
botonGenerar.addEventListener("click", () => {
  salida.textContent = "Calculando primos...\n";
  const limite = parseInt(inputLimite.value);

  const wPrimos = crearWorker(workerPrimos);

  wPrimos.onmessage = (e) => {
    salida.textContent += `Primos: ${e.data}\n`;
  };

  wPrimos.postMessage(limite);
});

/* para la busqueda de la palabra */
botonBuscar.addEventListener("click", () => {
  resultadoBusqueda.textContent = "Buscando palabra...\n";

  const parrafo = inputParrafo.value;
  const palabra = inputPalabra.value;

  const wBusqueda = crearWorker(workerBusqueda);

  wBusqueda.onmessage = (e) => {
    resultadoBusqueda.textContent = e.data;
  };

  wBusqueda.postMessage({ parrafo, palabra });
});
