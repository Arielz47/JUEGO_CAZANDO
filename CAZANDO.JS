const canvas = document.getElementById("areaJuego");
const ctx = canvas.getContext("2d");

// Posiciones inicializadas en cero.
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;

// Dimensiones del gato.
const ALTO_GATO = 40;
const ANCHO_GATO = 60;

// Dimensiones de la comida.
const ALTO_COMIDA = 20;
const ANCHO_COMIDA = 20;

// Función con parámetros para dibujar cualquier rectángulo.
function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

// Función sin parámetros para dibujar el gato.
function graficarGato() {
    graficarRectangulo(
        gatoX,
        gatoY,
        ANCHO_GATO,
        ALTO_GATO,
        "#7c3aed"
    );
}

// Función sin parámetros para dibujar la comida.
function graficarComida() {
    graficarRectangulo(
        comidaX,
        comidaY,
        ANCHO_COMIDA,
        ALTO_COMIDA,
        "#e65c00"
    );
}

// Función que se ejecuta al cargar la página.
function iniciarJuego() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gato centrado.
    gatoX = (canvas.width - ANCHO_GATO) / 2;
    gatoY = (canvas.height - ALTO_GATO) / 2;

    // Comida en la esquina inferior derecha.
    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    graficarGato();
    graficarComida();
}