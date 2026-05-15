// Array con 5 colores para filas pares
const coloresPares = ['#f2f2f2', '#ffffff', '#e8e8e8', '#d0d0d0', '#b8b8b8'];

// Array con 5 colores para filas impares
const coloresImpares = ['#d4e6f1', '#85c1e2', '#5dade2', '#3498db', '#2980b9'];

// Guardar los colores iniciales del HTML al cargar la página
let coloresInicialesDelHTML = [];

function guardarColoresInicialesDelHTML() {
    const filas = document.querySelectorAll('#tabla tr');
    coloresInicialesDelHTML = [];
    
    filas.forEach(fila => {
        coloresInicialesDelHTML.push(fila.style.backgroundColor);
    });
}

// Guardar los colores actuales en Local Storage
function guardarColores() {
    const filas = document.querySelectorAll('#tabla tr');
    const colores = [];
    
    filas.forEach(fila => {
        colores.push(fila.style.backgroundColor);
    });
    
    localStorage.setItem('coloresRecetas', JSON.stringify(colores));
}

// Cargar colores del Local Storage (solo si existen)
function cargarColores() {
    const coloresGuardados = localStorage.getItem('coloresRecetas');
    
    if (coloresGuardados) {
        const colores = JSON.parse(coloresGuardados);
        const filas = document.querySelectorAll('#tabla tr');
        
        filas.forEach((fila, index) => {
            if (colores[index]) {
                fila.style.backgroundColor = colores[index];
            }
        });
    }
}

// Cambiar color de una fila
function cambiarColor(fila, esParOImpar) {
    let coloresDisponibles;
    
    if (esParOImpar === 'par') {
        coloresDisponibles = coloresPares;
    } else {
        coloresDisponibles = coloresImpares;
    }
    
    // Obtener color actual
    let colorActual = fila.style.backgroundColor;
    
    // Encontrar el índice del color actual
    let indiceActual = coloresDisponibles.indexOf(colorActual);
    
    // Si no lo encuentra, volver al primero
    if (indiceActual === -1) {
        indiceActual = 0;
    }
    
    // Ir al siguiente color
    let nuevoIndice = (indiceActual + 1) % coloresDisponibles.length;
    fila.style.backgroundColor = coloresDisponibles[nuevoIndice];
    
    guardarColores();
}

// Resetear a los colores iniciales del HTML
function resetearColores() {
    const filas = document.querySelectorAll('#tabla tr');
    
    filas.forEach((fila, index) => {
        if (coloresInicialesDelHTML[index]) {
            fila.style.backgroundColor = coloresInicialesDelHTML[index];
        }
    });
    
    guardarColores();
}

// Agregar evento al botón de resetear
const btnReset = document.getElementById('btnReset');
btnReset.addEventListener('click', resetearColores);

// Agregar eventos a las filas
const filas = document.querySelectorAll('#tabla tr');
filas.forEach((fila, index) => {
    const esParOImpar = fila.classList.contains('fila-par') ? 'par' : 'impar';
    
    fila.addEventListener('click', function() {
        cambiarColor(fila, esParOImpar);
    });
});

// Guardar colores iniciales del HTML
guardarColoresInicialesDelHTML();

// Cargar colores guardados si existen
cargarColores();