const canvas = document.getElementById("areaJuego");
const ctx = canvas.getContext("2d");

const textoPuntos = document.getElementById("puntos");
const textoTiempo = document.getElementById("tiempo");
const mensaje = document.getElementById("mensaje");
const btnIniciar = document.getElementById("btnIniciar");

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

// Configuración del juego.
const PASO = 20;
const DURACION = 30;

// Estado de la partida.
let puntos = 0;
let tiempoRestante = DURACION;
let jugando = false;
let temporizador = null;
let momentoFinal = 0;

// Dibuja cualquier rectángulo.
function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

// Dibuja al gato.
function graficarGato() {
    graficarRectangulo(
        gatoX,
        gatoY,
        ANCHO_GATO,
        ALTO_GATO,
        "#7c3aed"
    );
}

// Dibuja la comida.
function graficarComida() {
    graficarRectangulo(
        comidaX,
        comidaY,
        ANCHO_COMIDA,
        ALTO_COMIDA,
        "#e65c00"
    );
}

// Actualiza el dibujo completo.
function dibujarEscena() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    graficarGato();
    graficarComida();
}

// Prepara el juego al cargar la página.
function iniciarJuego() {
    clearInterval(temporizador);
    temporizador = null;

    jugando = false;
    puntos = 0;
    tiempoRestante = DURACION;

    // Gato en el centro.
    gatoX = (canvas.width - ANCHO_GATO) / 2;
    gatoY = (canvas.height - ALTO_GATO) / 2;

    // Primera comida en la esquina inferior derecha.
    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    textoPuntos.textContent = puntos;
    textoTiempo.textContent = tiempoRestante;

    btnIniciar.textContent = "Comenzar";
    mensaje.textContent = "Presiona Comenzar para jugar.";

    dibujarEscena();
}

// Comienza o reinicia la partida.
function comenzarPartida() {
    iniciarJuego();

    jugando = true;
    momentoFinal = Date.now() + DURACION * 1000;

    btnIniciar.textContent = "Reiniciar";
    mensaje.textContent = "¡Atrapa toda la comida que puedas!";

    temporizador = setInterval(actualizarTiempo, 100);
}

// Calcula el tiempo restante.
function actualizarTiempo() {
    if (!jugando) {
        return;
    }

    tiempoRestante = Math.max(
        0,
        Math.ceil((momentoFinal - Date.now()) / 1000)
    );

    textoTiempo.textContent = tiempoRestante;

    if (tiempoRestante === 0) {
        terminarJuego();
    }
}

// Finaliza la partida.
function terminarJuego() {
    jugando = false;

    clearInterval(temporizador);
    temporizador = null;

    btnIniciar.textContent = "Jugar otra vez";
    mensaje.textContent =
        "¡Tiempo terminado! Tu puntaje es: " + puntos;
}

// Mueve el gato usando una dirección.
function moverGato(direccion) {
    if (!jugando) {
        return;
    }

    // Evita movimientos después de agotarse el tiempo.
    actualizarTiempo();

    if (!jugando) {
        return;
    }

    switch (direccion) {
        case "arriba":
            gatoY -= PASO;
            break;

        case "abajo":
            gatoY += PASO;
            break;

        case "izquierda":
            gatoX -= PASO;
            break;

        case "derecha":
            gatoX += PASO;
            break;

        default:
            return;
    }

    // Mantiene todo el gato dentro del canvas.
    gatoX = Math.max(
        0,
        Math.min(gatoX, canvas.width - ANCHO_GATO)
    );

    gatoY = Math.max(
        0,
        Math.min(gatoY, canvas.height - ALTO_GATO)
    );

    if (hayColision()) {
        puntos++;
        textoPuntos.textContent = puntos;

        cambiarComida();
    }

    dibujarEscena();
}

// Detecta si el gato toca la comida.
function hayColision() {
    return (
        gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY
    );
}

// Coloca la comida en una posición libre.
function cambiarComida() {
    const posicionesLibres = [];

    for (
        let y = 0;
        y <= canvas.height - ALTO_COMIDA;
        y += PASO
    ) {
        for (
            let x = 0;
            x <= canvas.width - ANCHO_COMIDA;
            x += PASO
        ) {
            const tocaGato =
                gatoX < x + ANCHO_COMIDA &&
                gatoX + ANCHO_GATO > x &&
                gatoY < y + ALTO_COMIDA &&
                gatoY + ALTO_GATO > y;

            if (!tocaGato) {
                posicionesLibres.push({ x: x, y: y });
            }
        }
    }

    const indice = Math.floor(
        Math.random() * posicionesLibres.length
    );

    comidaX = posicionesLibres[indice].x;
    comidaY = posicionesLibres[indice].y;
}

// Control con las flechas del teclado.
document.addEventListener("keydown", function (evento) {
    const direcciones = {
        ArrowUp: "arriba",
        ArrowDown: "abajo",
        ArrowLeft: "izquierda",
        ArrowRight: "derecha"
    };

    const direccion = direcciones[evento.key];

    if (direccion && jugando) {
        evento.preventDefault();
        moverGato(direccion);
    }
});