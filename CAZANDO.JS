const canvas = document.getElementById("areaJuego");
const ctx = canvas.getContext("2d");

// Posiciones inicializadas en cero.
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;

// Dimensiones de las figuras.
const ALTO_GATO = 40;
const ANCHO_GATO = 60;
const ALTO_COMIDA = 20;
const ANCHO_COMIDA = 20;

function graficarGato() {
    ctx.fillStyle = "#7c3aed";
    ctx.fillRect(gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
}

function graficarComida() {
    ctx.fillStyle = "#e65c00";
    ctx.fillRect(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA);
}

function iniciarJuego() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Centrar el gato.
    gatoX = (canvas.width - ANCHO_GATO) / 2;
    gatoY = (canvas.height - ALTO_GATO) / 2;

    // Colocar la comida en la esquina inferior derecha.
    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    graficarGato();
    graficarComida();
}