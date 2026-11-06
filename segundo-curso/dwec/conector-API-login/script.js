const URL_API = "https://api-rest-con-nodejs-express-tarea.vercel.app/api";

let token = "";
let refreshToken = "";

const mensaje = document.getElementById("mensaje");
const contenido = document.getElementById("contenido");
const tituloResultados = document.getElementById("tituloResultados");
const estadoSesion = document.getElementById("estadoSesion");
const inicio = document.getElementById("inicio");
const resultados = document.getElementById("resultados");
const botonVolver = document.getElementById("botonVolver");
const toast = document.getElementById("toast");

const formLogin = document.getElementById("formLogin");
const nombreLogin = document.getElementById("nombreLogin");
const passwordLogin = document.getElementById("passwordLogin");
const botonCerrarSesion = document.getElementById("botonCerrarSesion");

const botonVehiculos = document.getElementById("botonVehiculos");
const botonBuscarId = document.getElementById("botonBuscarId");
const inputBuscarId = document.getElementById("inputBuscarId");

const formAnadir = document.getElementById("formAnadir");
const marcaAnadir = document.getElementById("marcaAnadir");
const modeloAnadir = document.getElementById("modeloAnadir");
const anioAnadir = document.getElementById("anioAnadir");

const formModificar = document.getElementById("formModificar");
const idModificar = document.getElementById("idModificar");
const marcaModificar = document.getElementById("marcaModificar");
const modeloModificar = document.getElementById("modeloModificar");
const anioModificar = document.getElementById("anioModificar");

const formEliminar = document.getElementById("formEliminar");
const idEliminar = document.getElementById("idEliminar");

function mostrarMensaje(texto, tipo) {
    mensaje.innerText = texto;
    mensaje.className = tipo;
}

let temporizadorToast;

function mostrarToast(texto, tipo) {
    toast.innerText = texto;
    toast.className = tipo;
    toast.style.display = "block";
    clearTimeout(temporizadorToast);
    temporizadorToast = setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}



function mostrarResultados() {
    mostrarMensaje("", "");
    inicio.style.display = "none";
    resultados.style.display = "block";
    window.scrollTo(0, 0);
}

function volverAlInicio() {
    resultados.style.display = "none";
    inicio.style.display = "block";
    window.scrollTo(0, 0);
}



async function iniciarSesion(nombre, password) {
    try {
        const respuesta = await fetch(URL_API + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: nombre, password: password })
        });
        const datos = await respuesta.json();

        if (datos.token) {
            token = datos.token;
            refreshToken = datos.refreshToken;
            estadoSesion.innerText = "Sesión iniciada como " + nombre;
            mostrarMensaje("Sesión iniciada correctamente", "ok");
        } else {
            mostrarMensaje(datos.message, "error");
        }
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se ha podido conectar con la API", "error");
    }
}

async function renovarToken() {
    if (refreshToken == "") {
        return false;
    }

    try {
        const respuesta = await fetch(URL_API + "/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: refreshToken })
        });

        if (respuesta.ok) {
            const datos = await respuesta.json();
            token = datos.token;
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

function cerrarSesion() {
    token = "";
    refreshToken = "";
    estadoSesion.innerText = "Sin sesión iniciada";
}


async function peticionConToken(url, metodo, cuerpo) {
    let respuesta = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
        body: cuerpo ? JSON.stringify(cuerpo) : undefined
    });

    if (respuesta.status == 403) {
        const renovado = await renovarToken();

        if (renovado) {
            respuesta = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                body: cuerpo ? JSON.stringify(cuerpo) : undefined
            });
        } else {
            cerrarSesion();
            mostrarToast("La sesión ha caducado, vuelve a iniciar sesión", "error");
        }
    }

    return respuesta;
}

function haySesion() {
    if (token == "") {
        mostrarToast("Primero tienes que iniciar sesión", "error");
        return false;
    }
    return true;
}



async function cargarVehiculos() {
    try {
        const respuesta = await fetch(URL_API + "/vehiculos");
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error(error);
        mostrarToast("No se ha podido conectar con la API", "error");
    }
}

async function cargarVehiculoPorId(id) {
    try {
        const respuesta = await fetch(URL_API + "/vehiculos/" + id);
        const datos = await respuesta.json();

        if (!respuesta.ok) {
            mostrarToast(datos.message, "error");
            return;
        }
        return datos;
    } catch (error) {
        console.error(error);
        mostrarToast("No se ha podido conectar con la API", "error");
    }
}



function mostrarVehiculos(lista) {
    contenido.innerHTML = "";
    tituloResultados.innerText = "Vehículos (" + lista.length + ")";
    mostrarResultados();

    lista.forEach(vehiculo => {
        const tarjeta = document.createElement("div");
        const marca = document.createElement("h3");
        const modelo = document.createElement("p");
        const anio = document.createElement("p");
        const id = document.createElement("p");

        tarjeta.className = "tarjeta";
        modelo.className = "modelo";
        anio.className = "anio";
        id.className = "id";

        marca.innerText = vehiculo.marca;
        modelo.innerText = vehiculo.modelo;
        anio.innerText = "Año " + vehiculo.anio;
        id.innerText = "ID: " + vehiculo._id;

        tarjeta.appendChild(marca);
        tarjeta.appendChild(modelo);
        tarjeta.appendChild(anio);
        tarjeta.appendChild(id);
        contenido.appendChild(tarjeta);
    });
}

async function refrescarVehiculos() {
    const vehiculos = await cargarVehiculos();
    if (vehiculos != undefined) {
        mostrarVehiculos(vehiculos);
    }
}



async function anadirVehiculo(marca, modelo, anio) {
    if (!haySesion()) {
        return;
    }

    try {
        const respuesta = await peticionConToken(URL_API + "/vehiculos", "POST", { marca: marca, modelo: modelo, anio: anio });

        if (respuesta.ok) {
            const datos = await respuesta.json();
            const vehiculo = await cargarVehiculoPorId(datos.insertedId);

            if (vehiculo != undefined) {
                mostrarToast("Vehículo añadido correctamente", "ok");
                mostrarVehiculos(vehiculo);
            }
        } else if (token != "") {
            mostrarToast("Error al añadir. Código: " + respuesta.status, "error");
        }
    } catch (error) {
        console.error(error);
        mostrarToast("No se ha podido conectar con la API", "error");
    }
}



async function modificarVehiculo(id, marca, modelo, anio) {
    if (!haySesion()) {
        return;
    }

    try {
        const respuesta = await peticionConToken(URL_API + "/vehiculos/" + id, "PUT", { marca: marca, modelo: modelo, anio: anio });

        if (respuesta.ok) {
            const vehiculo = await cargarVehiculoPorId(id);

            if (vehiculo == undefined) {
                return;
            }

            if (vehiculo.length == 0) {
                mostrarToast("No existe ningún vehículo con ese ID", "error");
            } else {
                mostrarToast("Vehículo modificado correctamente", "ok");
                mostrarVehiculos(vehiculo);
            }
        } else if (token != "") {
            const datos = await respuesta.json();
            mostrarToast(datos.message, "error");
        }
    } catch (error) {
        console.error(error);
        mostrarToast("No se ha podido conectar con la API", "error");
    }
}



async function eliminarVehiculo(id) {
    if (!haySesion()) {
        return;
    }

    if (!confirm("¿Seguro que quieres eliminar el vehículo con ID " + id + "?")) {
        return;
    }

    try {
        const respuesta = await peticionConToken(URL_API + "/vehiculos/" + id, "DELETE");

        if (respuesta.ok) {
            const datos = await respuesta.json();

            if (datos.deletedCount == 1) {
                mostrarToast("Vehículo eliminado correctamente", "ok");
            } else {
                mostrarToast("No existe ningún vehículo con ese ID", "error");
            }
        } else if (token != "") {
            const datos = await respuesta.json();
            mostrarToast(datos.message, "error");
        }
    } catch (error) {
        console.error(error);
        mostrarToast("No se ha podido conectar con la API", "error");
    }
}



formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    iniciarSesion(nombreLogin.value, passwordLogin.value);
    formLogin.reset();
});

botonCerrarSesion.addEventListener("click", () => {
    cerrarSesion();
    mostrarToast("Sesión cerrada", "ok");
});

botonVehiculos.addEventListener("click", () => {
    refrescarVehiculos();
});

botonBuscarId.addEventListener("click", async () => {
    const id = inputBuscarId.value.trim();

    if (id == "") {
        mostrarToast("Escribe el ID de un vehículo", "error");
        return;
    }
    const resultado = await cargarVehiculoPorId(id);

    if (resultado == undefined) {
        return;
    }

    if (resultado.length == 0) {
        mostrarToast("No existe ningún vehículo con ese ID", "error");
    } else {
        mostrarVehiculos(resultado);
    }
});

formAnadir.addEventListener("submit", (e) => {
    e.preventDefault();
    anadirVehiculo(marcaAnadir.value, modeloAnadir.value, Number(anioAnadir.value));
    formAnadir.reset();
});

formModificar.addEventListener("submit", (e) => {
    e.preventDefault();
    modificarVehiculo(idModificar.value.trim(), marcaModificar.value, modeloModificar.value, Number(anioModificar.value));
    formModificar.reset();
});

formEliminar.addEventListener("submit", (e) => {
    e.preventDefault();
    eliminarVehiculo(idEliminar.value.trim());
    formEliminar.reset();
});

botonVolver.addEventListener("click", () => {
    volverAlInicio();
});