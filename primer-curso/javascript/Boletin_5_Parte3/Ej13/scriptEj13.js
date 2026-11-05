let matriz = [];
let tesoroX = 0;
let tesoroY = 0;
let intentos = 0;
let juegoTerminado = false;

// Inicializar el juego
function inicializarJuego() {
    // Crear matriz 10x10
    matriz = [];
    for(let i = 0; i < 10; i++) {
        matriz[i] = [];
        for(let j = 0; j < 10; j++) {
            matriz[i][j] = 1; // 1 = no visitado
        }
    }

    // Colocar tesoro aleatoriamente
    tesoroX = Math.floor(Math.random() * 10);
    tesoroY = Math.floor(Math.random() * 10);

    intentos = 0;
    juegoTerminado = false;

    // Limpiar mensaje
    document.getElementById('mensaje').textContent = '';
    document.getElementById('mensaje').className = 'mensaje brujula';

    // Generar tabla
    generarTabla();
}

function generarTabla() {
    const contenedor = document.getElementById('tabla');
    contenedor.innerHTML = '';

    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            const celda = document.createElement('div');
            celda.className = 'celda';
            celda.textContent = `${i},${j}`;
            celda.onclick = () => hacerClick(i, j, celda);
            contenedor.appendChild(celda);
        }
    }
}

function hacerClick(x, y, elemento) {
    if(juegoTerminado) return;

    if(matriz[x][y] === 1) {
        matriz[x][y] = 0; 
        elemento.classList.add('visitada');
        intentos++;
        document.getElementById('intentos').textContent = `Intentos: ${intentos}`;

        if(x === tesoroX && y === tesoroY) {
            // ¡Ganaste!
            juegoTerminado = true;
            const msg = document.getElementById('mensaje');
            msg.textContent = `🎉 ¡Encontraste el tesoro en ${intentos} intentos!`;
            msg.className = 'mensaje ganaste';
        } else {
            // Mostrar dirección
            mostrarDireccion(x, y);
        }
    }
}

function mostrarDireccion(x, y) {
    let direccion = '';

    if(x < tesoroX && y === tesoroY) direccion = '⬇️ El tesoro está al Sur';
    else if(x > tesoroX && y === tesoroY) direccion = '⬆️ El tesoro está al Norte';
    else if(x === tesoroX && y < tesoroY) direccion = '➡️ El tesoro está al Este';
    else if(x === tesoroX && y > tesoroY) direccion = '⬅️ El tesoro está al Oeste';
    else if(x < tesoroX && y < tesoroY) direccion = '↘️ El tesoro está al Sureste';
    else if(x < tesoroX && y > tesoroY) direccion = '↙️ El tesoro está al Suroeste';
    else if(x > tesoroX && y < tesoroY) direccion = '↗️ El tesoro está al Noreste';
    else if(x > tesoroX && y > tesoroY) direccion = '↖️ El tesoro está al Noroeste';

    document.getElementById('mensaje').textContent = direccion;
}

function reiniciarJuego() {
    inicializarJuego();
}

// Iniciar el juego al cargar
inicializarJuego();