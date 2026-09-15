const canvas = document.getElementById("areaJuego");
const ctx = canvas.getContext("2d");

function graficarGato() {
    ctx.fillStyle = "#7c3aed";

    ctx.fillRect(
        (canvas.width - 60) / 2,
        (canvas.height - 40) / 2,
        60,
        40
    );
}

function graficarComida() {
    ctx.fillStyle = "#e65c00";

    // Cuadrado en la esquina superior izquierda.
    ctx.fillRect(0, 0, 20, 20);
}

function iniciarJuego() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    graficarGato();
    graficarComida();
}