// Mapa donde almacenamos los datos
const mapaAgenda = new Map();
// idSeleccionado usado para almacenar el ID del contacto
let idSeleccionado = null;

// Elementos del DOM
const formularioContacto = document.getElementById('formulario-contacto');
const listaContactos = document.getElementById('lista-contactos');
const placaContadorContactos = document.getElementById('contador-contactos');
const estadoVacio = document.getElementById('estado-vacio');
const botonEnviar = document.getElementById('boton-enviar');
const botonCancelar = document.getElementById('boton-cancelar');
const tituloFormulario = document.getElementById('titulo-formulario');
const inputModoEdicion = document.getElementById('modo-edicion');

// Botones Globales
const botonEditarGlobal = document.getElementById('boton-editar-global');
const botonBorrarGlobal = document.getElementById('boton-borrar-global');

// Entradas del formulario
const inputId = document.getElementById('contacto-id');
const inputNombre = document.getElementById('contacto-nombre');
const inputDireccion = document.getElementById('contacto-direccion');
const inputTelefono = document.getElementById('contacto-telefono');


/**
 * Inicialización al cargar el documento
 */


document.addEventListener('DOMContentLoaded', () => {
    //
});

/**
 * Configura los eventos para los botones
 */
botonEnviar.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputModoEdicion.value === "true") { 
        mapaAgenda.set(idSeleccionado, {
            nombre: inputNombre.value,
            direccion: inputDireccion.value,
            telefono: inputTelefono.value
        });
        actualizarVistaAgenda();  
        limpiarFormulario();      
    } else {
        guardarDatos();
        actualizarVistaAgenda();
    }
});

botonBorrarGlobal.addEventListener("click",()=>{
eliminarContacto();
});

botonEditarGlobal.addEventListener("click",(e)=>{
editarContacto();
})
;






/**
 * Actualiza la tabla de contactos en el DOM
 */

function actualizarVistaAgenda() {
    listaContactos.innerHTML = ``;
    mapaAgenda.forEach((valor, clave) => {
        listaContactos.innerHTML += `<tr>
            <td><input type="radio" name="seleccion" value="${clave}"></td>
            <td>${clave}</td>
            <td>${valor.nombre}</td>
            <td>${valor.direccion}</td>
            <td>${valor.telefono}</td>
        </tr>`;
    });
    
    if (mapaAgenda.size == 1) {
        placaContadorContactos.innerHTML = `${mapaAgenda.size} contacto`;
    } else {
        placaContadorContactos.innerHTML = `${mapaAgenda.size} contactos`;
    }
    
    if (mapaAgenda.size > 0) {
        estadoVacio.classList.add("oculto");
    } else {
        estadoVacio.classList.remove("oculto");
    }
}

/**
 * Guarda los datos del formulario
 */
function guardarDatos() {
    if (mapaAgenda.has(inputId.value)) {
        alert("Ya existe un contacto con el id " + inputId.value);
    } else {
        mapaAgenda.set(
            inputId.value,
            {
                nombre: inputNombre.value,
                direccion: inputDireccion.value,
                telefono: inputTelefono.value
            }
        );
    }
    limpiarFormulario();
}


/**
 * Carga los datos de un contacto en el formulario para editarlo
 */

function editarContacto() {
    const radio = document.querySelector('input[name="seleccion"]:checked');
    if (radio !== null) {
        idSeleccionado = radio.value;
        const contacto = mapaAgenda.get(idSeleccionado);
        
        inputId.value = idSeleccionado;
        inputId.readOnly = true; 
        
        inputNombre.value = contacto.nombre;
        inputDireccion.value = contacto.direccion;
        inputTelefono.value = contacto.telefono;
        
        tituloFormulario.innerHTML = `Editar contacto`;
        botonEnviar.textContent = `Actualizar contacto`;
        botonCancelar.classList.remove("oculto");
        inputModoEdicion.value = "true";
    } else {
        alert("Selecciona un usuario primero.");
    }
}

/**
 * Elimina un contacto del mapa tras confirmación
 */


function eliminarContacto() {
    const radio = document.querySelector('input[name="seleccion"]:checked');
    if (radio == null) {
        alert("Selecciona un usuario primero.");
    } else {
        idSeleccionado = radio.value;
        if (confirm("Se va a borrar el usuario con id " + idSeleccionado)) {
            mapaAgenda.delete(idSeleccionado);
            actualizarVistaAgenda();
        }
    }
}

/**
 * Restablece el formulario a su estado inicial (Añadir)
 */
function limpiarFormulario() {
    formularioContacto.reset();
    inputModoEdicion.value = 'false';
    inputId.readOnly = false;
    tituloFormulario.textContent = 'Añadir Contacto';
    botonEnviar.textContent = 'Guardar Contacto';
    botonCancelar.classList.add('oculto');
}

/**
 * Evento para el botón de cancelar edición
 */
botonCancelar.addEventListener('click', () => {
    limpiarFormulario();
});
