// Array con 5 colores para filas pares (empezando con #f2f2f2)
const coloresPares = ['#f2f2f2', '#ffffff', '#e8e8e8', '#d0d0d0', '#b8b8b8'];

// Array con 5 colores para filas impares (empezando con #d4e6f1)
const coloresImpares = ['#d4e6f1', '#85c1e2', '#5dade2', '#3498db', '#2980b9'];

// Inicializar: cargar colores del Local Storage
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

// Guardar los colores actuales en Local Storage
function guardarColores() {
    const filas = document.querySelectorAll('#tabla tr');
    const colores = [];
    
    filas.forEach(fila => {
        colores.push(fila.style.backgroundColor);
    });
    
    localStorage.setItem('coloresRecetas', JSON.stringify(colores));
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

// Asignar colores iniciales a las filas
function asignarColoresIniciales() {
    const filas = document.querySelectorAll('#tabla tr');
    filas.forEach((fila, index) => {
        if (fila.classList.contains('fila-par')) {
            fila.style.backgroundColor = coloresPares[0];
        } else {
            fila.style.backgroundColor = coloresImpares[0];
        }
    });
    guardarColores();
}

// Resetear a colores originales
function resetearColores() {
    asignarColoresIniciales();
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

// Cargar colores cuando abre la página, o asignar iniciales
if (localStorage.getItem('coloresRecetas')) {
    cargarColores();
} else {
    asignarColoresIniciales();
}