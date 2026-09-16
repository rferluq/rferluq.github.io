// --- ESTRUCTURA DE DATOS ---

// Map es como una tabla: cada contacto se guarda con su ID como "llave" y sus datos como "valor".
// Usamos Map en lugar de un array porque nos permite buscar, editar y borrar por ID directamente.
const mapaAgenda = new Map();

// Variable que guarda el ID del contacto que el usuario ha seleccionado con el radio button.
// Empieza en null porque al inicio no hay nada seleccionado.
let idSeleccionado = null;


// --- REFERENCIAS A ELEMENTOS DEL HTML ---
// getElementById busca en el HTML el elemento que tenga ese id="..." y lo guarda en una variable
// para poder manipularlo desde JS sin tener que buscarlo cada vez.

const formularioContacto = document.getElementById('formulario-contacto');   // El <form> completo
const listaContactos = document.getElementById('lista-contactos');            // El <tbody> de la tabla donde van las filas
const placaContadorContactos = document.getElementById('contador-contactos'); // El <span> que muestra "X contactos"
const estadoVacio = document.getElementById('estado-vacio');                  // El <div> con el mensaje "No hay contactos"
const botonEnviar = document.getElementById('boton-enviar');                  // Botón "Guardar Contacto" / "Actualizar Contacto"
const botonCancelar = document.getElementById('boton-cancelar');              // Botón "Cancelar" (oculto por defecto)
const tituloFormulario = document.getElementById('titulo-formulario');        // El <h2> "Añadir Contacto" / "Editar Contacto"
const inputModoEdicion = document.getElementById('modo-edicion');             // Input hidden que guarda 'true'/'false' según el modo

const botonEditarGlobal = document.getElementById('boton-editar-global');     // Botón "Editar" de la cabecera de la tabla
const botonBorrarGlobal = document.getElementById('boton-borrar-global');     // Botón "Borrar" de la cabecera de la tabla

const inputId = document.getElementById('contacto-id');               // Campo de texto del ID
const inputNombre = document.getElementById('contacto-nombre');       // Campo de texto del Nombre
const inputDireccion = document.getElementById('contacto-direccion'); // Campo de texto de la Dirección
const inputTelefono = document.getElementById('contacto-telefono');   // Campo de texto del Teléfono


// --- INICIALIZACIÓN ---

// DOMContentLoaded se dispara cuando el navegador ha terminado de leer todo el HTML.
// Es necesario esperar a esto antes de tocar el DOM, porque si el JS corre antes de que
// existan los elementos HTML, getElementById devolvería null y el código fallaría.
document.addEventListener('DOMContentLoaded', () => {
    actualizarVistaAgenda(); // Dibuja la tabla (vacía al inicio)
    configurarEventos();     // Activa todos los botones
});


// --- CONFIGURACIÓN DE EVENTOS ---

function configurarEventos() {
    // 'submit' se dispara cuando el usuario pulsa el botón de tipo submit dentro del formulario.
    // e.preventDefault() evita que el formulario recargue la página (comportamiento por defecto del navegador).
    // Luego comprobamos si estamos en modo edición o no para llamar a la función correcta.
    formularioContacto.addEventListener('submit', (e) => {
        e.preventDefault(); // Cancela la recarga de página
        if (inputModoEdicion.value === 'true') {
            actualizarContacto(); // Si estamos editando, actualizamos
        } else {
            agregarContacto();    // Si no, añadimos nuevo
        }
    });

    // 'click' se dispara cuando el usuario hace clic en el botón.
    // Cada botón llama a su función correspondiente.
    botonCancelar.addEventListener('click', () => {
        limpiarFormulario(); // Cancela la edición y resetea el formulario
    });

    botonEditarGlobal.addEventListener('click', () => {
        editarContacto(); // Carga el contacto seleccionado en el formulario
    });

    botonBorrarGlobal.addEventListener('click', () => {
        eliminarContacto(); // Elimina el contacto seleccionado
    });
}


// --- FUNCIONES PRINCIPALES ---

// Redibuja la tabla entera leyendo los datos actuales del Map.
// Se llama cada vez que se añade, edita o elimina un contacto.
function actualizarVistaAgenda() {
    // Vaciamos el contenido previo de la tabla para volver a pintarlo desde cero.
    // innerHTML = '' borra todos los elementos hijos del <tbody>.
    listaContactos.innerHTML = '';

    // Si el mapa no tiene ningún contacto, mostramos el mensaje de "lista vacía".
    // .size devuelve el número de elementos del Map.
    if (mapaAgenda.size === 0) {
        estadoVacio.style.display = 'block'; // Hacemos visible el mensaje
    } else {
        estadoVacio.style.display = 'none';  // Ocultamos el mensaje

        // forEach recorre cada elemento del Map.
        // Por cada contacto recibimos su 'dni' (la clave) y 'contacto' (el objeto con nombre/dirección/teléfono).
        mapaAgenda.forEach((contacto, dni) => {

            // Creamos un elemento <tr> (fila de tabla) en memoria, aún sin añadirlo al HTML.
            const tr = document.createElement('tr');

            // Si este contacto es el que está seleccionado, le añadimos la clase CSS 'seleccionada'
            // para que se pinte de otro color y el usuario sepa cuál está activo.
            if (idSeleccionado === dni) {
                tr.classList.add('seleccionada');
            }

            // innerHTML nos permite escribir el HTML interno de la fila como una cadena de texto.
            // Usamos template literals (`) para poder insertar variables con ${...} dentro del texto.
            // El radio button tiene name="contacto-seleccionado" igual en todos para que solo se pueda marcar uno.
            // El atributo value guarda el ID del contacto para saber cuál se marcó.
            // El operador ternario (condición ? 'si' : 'no') añade 'checked' si este era el seleccionado.
            tr.innerHTML = `
                <td>
                    <input type="radio" name="contacto-seleccionado" value="${dni}"
                        ${idSeleccionado === dni ? 'checked' : ''}>
                </td>
                <td>${dni}</td>
                <td>${contacto.nombre}</td>
                <td>${contacto.direccion}</td>
                <td>${contacto.telefono}</td>
            `;

            // Buscamos el radio button dentro de la fila que acabamos de crear
            // para asignarle su propio evento 'change' (se dispara al marcarlo).
            const radio = tr.querySelector('input[type="radio"]');
            radio.addEventListener('change', () => {
                // Guardamos el ID de este contacto como el seleccionado
                idSeleccionado = dni;

                // Quitamos la clase 'seleccionada' de TODAS las filas primero...
                document.querySelectorAll('#lista-contactos tr').forEach(fila => {
                    fila.classList.remove('seleccionada');
                });
                // ...y luego se la añadimos solo a la fila actual.
                tr.classList.add('seleccionada');
            });

            // appendChild añade la fila <tr> al final del <tbody> en el HTML real.
            listaContactos.appendChild(tr);
        });
    }

    // Actualizamos el texto del contador.
    // El operador ternario elige entre "1 contacto" (singular) o "X contactos" (plural).
    const total = mapaAgenda.size;
    placaContadorContactos.textContent = total === 1 ? '1 contacto' : `${total} contactos`;
}


// Lee los campos del formulario y añade un contacto nuevo al Map.
function agregarContacto() {
    // .value obtiene el texto escrito en el input.
    // .trim() elimina espacios en blanco al inicio y al final para evitar entradas como "   ".
    const dni = inputId.value.trim();
    const nombre = inputNombre.value.trim();
    const direccion = inputDireccion.value.trim();
    const telefono = inputTelefono.value.trim();

    // Validación: si algún campo está vacío (''), mostramos un aviso y salimos con return.
    // return sin valor simplemente detiene la ejecución de la función.
    if (dni === '' || nombre === '' || direccion === '' || telefono === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // .has(clave) comprueba si ya existe un elemento con esa clave en el Map.
    // Si ya existe ese ID, avisamos y salimos sin guardar nada.
    if (mapaAgenda.has(dni)) {
        alert(`Ya existe un contacto con el ID "${dni}". Por favor, usa un ID único.`);
        return;
    }

    // .set(clave, valor) añade o sobreescribe un elemento en el Map.
    // Guardamos el dni como clave y un objeto con el resto de datos como valor.
    // La sintaxis { nombre, direccion, telefono } es equivalente a { nombre: nombre, direccion: direccion, telefono: telefono }.
    mapaAgenda.set(dni, { nombre, direccion, telefono });

    limpiarFormulario();     // Vaciamos el formulario
    actualizarVistaAgenda(); // Refrescamos la tabla
}


// Carga en el formulario los datos del contacto seleccionado para poder modificarlos.
function editarContacto() {
    // Si no hay ningún contacto seleccionado (null), avisamos y salimos.
    if (idSeleccionado === null) {
        alert('Por favor, selecciona un contacto para editar.');
        return;
    }

    // .get(clave) devuelve el objeto guardado en el Map para esa clave.
    const contacto = mapaAgenda.get(idSeleccionado);
    if (!contacto) return; // Seguridad extra: si por algún motivo no existe, salimos

    // Rellenamos cada input del formulario con los datos del contacto recuperado.
    // Asignamos a .value el texto que queremos que aparezca en el campo.
    inputId.value = idSeleccionado;
    inputNombre.value = contacto.nombre;
    inputDireccion.value = contacto.direccion;
    inputTelefono.value = contacto.telefono;

    // readOnly = true hace que el campo ID no se pueda editar,
    // porque el ID es la clave del Map y cambiarla crearía un contacto nuevo en vez de editar el existente.
    inputId.readOnly = true;

    // Cambiamos la UI para indicar visualmente que estamos en modo edición:
    inputModoEdicion.value = 'true';                         // Marcamos el modo edición
    tituloFormulario.textContent = 'Editar Contacto';        // Cambiamos el título
    botonEnviar.textContent = 'Actualizar Contacto';         // Cambiamos el texto del botón
    botonCancelar.classList.remove('oculto');                // Mostramos el botón Cancelar (quitamos la clase que lo ocultaba)
}


// Sobreescribe en el Map los datos modificados del contacto que se está editando.
function actualizarContacto() {
    // No leemos el ID porque está bloqueado y no ha cambiado; usamos idSeleccionado directamente.
    const nombre = inputNombre.value.trim();
    const direccion = inputDireccion.value.trim();
    const telefono = inputTelefono.value.trim();

    if (nombre === '' || direccion === '' || telefono === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // .set() con una clave que ya existe sobreescribe el valor anterior, lo que equivale a "editar".
    mapaAgenda.set(idSeleccionado, { nombre, direccion, telefono });

    limpiarFormulario();     // Volvemos al modo "Añadir"
    actualizarVistaAgenda(); // Refrescamos la tabla con los datos nuevos
}


// Elimina el contacto seleccionado del Map tras pedir confirmación al usuario.
function eliminarContacto() {
    if (idSeleccionado === null) {
        alert('Por favor, selecciona un contacto para eliminar.');
        return;
    }

    // confirm() muestra un diálogo nativo del navegador con Aceptar/Cancelar.
    // Devuelve true si el usuario pulsa Aceptar, false si pulsa Cancelar.
    const confirmado = confirm('¿Estás seguro de querer eliminar el contacto?');
    if (confirmado) {
        // .delete(clave) elimina el elemento con esa clave del Map.
        mapaAgenda.delete(idSeleccionado);
        idSeleccionado = null; // Limpiamos la selección porque el contacto ya no existe
        limpiarFormulario();
        actualizarVistaAgenda();
    }
    // Si confirmado es false (pulsó Cancelar), no hacemos nada y la función termina.
}


// Resetea el formulario a su estado original ("modo añadir"), como si acabara de cargar la página.
function limpiarFormulario() {
    // .reset() es un método nativo de los formularios HTML que vacía todos sus campos de golpe.
    formularioContacto.reset();

    inputModoEdicion.value = 'false';                // Desactivamos el modo edición
    inputId.readOnly = false;                        // Volvemos a permitir escribir el ID
    tituloFormulario.textContent = 'Añadir Contacto'; // Restauramos el título
    botonEnviar.textContent = 'Guardar Contacto';    // Restauramos el texto del botón
    botonCancelar.classList.add('oculto');           // Ocultamos el botón Cancelar añadiendo la clase CSS 'oculto'
    idSeleccionado = null;                           // Limpiamos la selección activa
}