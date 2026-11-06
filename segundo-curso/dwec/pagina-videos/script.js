const contenidos = [
    new Map([
        ["id", 1],
        ["titulo", "Vídeo 1"],
        ["categoria", "Humor"],
        ["descripcion", "Este es un vídeo de humor."],
        ["imagen", "imagen1.jpg"],
        ["video", "video1.mp4"]
    ]),
    new Map([
        ["id", 2],
        ["titulo", "Vídeo 2"],
        ["categoria", "Cine"],
        ["descripcion", "Este es un vídeo de cine."],
        ["imagen", "imagen2.jpg"],
        ["video", "video2.mp4"]
    ]),
    new Map([
        ["id", 3],
        ["titulo", "Vídeo 3"],
        ["categoria", "Música"],
        ["descripcion", "Este es un vídeo de música."],
        ["imagen", "imagen3.jpg"],
        ["video", "video3.mp4"]
    ])
];

let zona = document.getElementById("zonaContenido");
let cabecera = document.getElementById("tituloCabecera");
let enlaceInicio = document.getElementById("enlaceInicio");
let enlaceVideos = document.getElementById("enlaceVideos");
let enlaceBusqueda = document.getElementById("enlaceBusqueda");

//  MENÚ 

function quitarActivos() {
    enlaceInicio.setAttribute("class", "");
    enlaceVideos.setAttribute("class", "");
    enlaceBusqueda.setAttribute("class", "");
}

function clicInicio(evento) {
    evento.preventDefault();
    quitarActivos();
    enlaceInicio.setAttribute("class", "active");
    mostrarInicio();
}

function clicVideos(evento) {
    evento.preventDefault();
    quitarActivos();
    enlaceVideos.setAttribute("class", "active");
    mostrarVideos();
}

function clicBusqueda(evento) {
    evento.preventDefault();
    quitarActivos();
    enlaceBusqueda.setAttribute("class", "active");
    mostrarBusqueda();
}

enlaceInicio.addEventListener("click", clicInicio);
enlaceVideos.addEventListener("click", clicVideos);
enlaceBusqueda.addEventListener("click", clicBusqueda);

//  INICIO 

function mostrarInicio() {
    zona.innerHTML = "";
    cabecera.textContent = "Bienvenido al almacén de vídeos de Rafael";

    let articulo = document.createElement("article");

    let titulo = document.createElement("h2");
    titulo.textContent = "Instrucciones";

    let parrafo1 = document.createElement("p");
    parrafo1.textContent = "En la opción Vídeos puedes ver todos los vídeos del almacén.";

    let parrafo2 = document.createElement("p");
    parrafo2.textContent = "En la opción Búsqueda puedes buscar vídeos por título y por categoría.";

    let parrafo3 = document.createElement("p");
    parrafo3.textContent = "Pulsa en Reproducir en cualquier vídeo para verlo.";

    articulo.appendChild(titulo);
    articulo.appendChild(parrafo1);
    articulo.appendChild(parrafo2);
    articulo.appendChild(parrafo3);
    zona.appendChild(articulo);
}

//  VÍDEOS 

function mostrarVideos() {
    zona.innerHTML = "";
    cabecera.textContent = "Listado de vídeos";

    for (let i = 0; i < contenidos.length; i++) {
        let tarjeta = crearTarjeta(contenidos[i]);
        zona.appendChild(tarjeta);
    }
}

function ponerResaltada(evento) {
    evento.target.setAttribute("class", "tarjeta tarjetaResaltada");
}

function quitarResaltada(evento) {
    evento.target.setAttribute("class", "tarjeta");
}

function crearTarjeta(video) {
    let tarjeta = document.createElement("article");
    tarjeta.setAttribute("class", "tarjeta");

    let titulo = document.createElement("h2");
    titulo.textContent = video.get("titulo");

    let imagen = document.createElement("img");
    imagen.src = "imagenes/" + video.get("imagen");
    imagen.alt = video.get("titulo");

    let parrafoId = document.createElement("p");
    parrafoId.textContent = "Id: " + video.get("id");

    let parrafoCategoria = document.createElement("p");
    parrafoCategoria.textContent = "Categoría: " + video.get("categoria");

    let parrafoDescripcion = document.createElement("p");
    parrafoDescripcion.textContent = "Descripción: " + video.get("descripcion");

    let parrafoImagen = document.createElement("p");
    parrafoImagen.textContent = "Imagen: " + video.get("imagen");

    let parrafoVideo = document.createElement("p");
    parrafoVideo.textContent = "Vídeo: " + video.get("video");

    let enlace = document.createElement("a");
    enlace.href = "#";
    enlace.textContent = "Reproducir";
    enlace.setAttribute("class", "enlaceReproducir");
    enlace.setAttribute("data-id", video.get("id"));

    enlace.addEventListener("click", clicReproducir);
    tarjeta.addEventListener("mouseenter", ponerResaltada);
    tarjeta.addEventListener("mouseleave", quitarResaltada);

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(imagen);
    tarjeta.appendChild(parrafoId);
    tarjeta.appendChild(parrafoCategoria);
    tarjeta.appendChild(parrafoDescripcion);
    tarjeta.appendChild(parrafoImagen);
    tarjeta.appendChild(parrafoVideo);
    tarjeta.appendChild(enlace);

    return tarjeta;
}

//  BÚSQUEDA 

function mostrarBusqueda() {
    zona.innerHTML = "";
    cabecera.textContent = "Búsqueda de vídeos";

    let contenedor = document.createElement("div");

    let articulo = document.createElement("article");

    let formulario = document.createElement("form");
    formulario.id = "formularioBusqueda";

    let etiquetaTitulo = document.createElement("label");
    etiquetaTitulo.textContent = "Título:";
    etiquetaTitulo.htmlFor = "campoTitulo";

    let campoTitulo = document.createElement("input");
    campoTitulo.type = "text";
    campoTitulo.id = "campoTitulo";

    let errorTitulo = document.createElement("p");
    errorTitulo.id = "errorTitulo";
    errorTitulo.setAttribute("class", "mensajeError");

    let etiquetaCategoria = document.createElement("label");
    etiquetaCategoria.textContent = "Categoría:";
    etiquetaCategoria.htmlFor = "campoCategoria";

    let campoCategoria = document.createElement("select");
    campoCategoria.id = "campoCategoria";

    let opcion0 = document.createElement("option");
    opcion0.value = "Todas";
    opcion0.textContent = "Todas";

    let opcion1 = document.createElement("option");
    opcion1.value = "Humor";
    opcion1.textContent = "Humor";

    let opcion2 = document.createElement("option");
    opcion2.value = "Cine";
    opcion2.textContent = "Cine";

    let opcion3 = document.createElement("option");
    opcion3.value = "Música";
    opcion3.textContent = "Música";

    campoCategoria.appendChild(opcion0);
    campoCategoria.appendChild(opcion1);
    campoCategoria.appendChild(opcion2);
    campoCategoria.appendChild(opcion3);

    let botonBuscar = document.createElement("button");
    botonBuscar.type = "submit";
    botonBuscar.textContent = "Buscar";

    formulario.appendChild(etiquetaTitulo);
    formulario.appendChild(campoTitulo);
    formulario.appendChild(errorTitulo);
    formulario.appendChild(etiquetaCategoria);
    formulario.appendChild(campoCategoria);
    formulario.appendChild(botonBuscar);

    formulario.addEventListener("submit", enviarFormulario);
    campoTitulo.addEventListener("blur", comprobarCampo);
    campoTitulo.addEventListener("input", comprobarCampo);

    articulo.appendChild(formulario);

    let resultados = document.createElement("div");
    resultados.id = "resultados";
    resultados.setAttribute("class", "content");

    contenedor.appendChild(articulo);
    contenedor.appendChild(resultados);
    zona.appendChild(contenedor);
}

function comprobarCampo() {
    let campo = document.getElementById("campoTitulo");
    let error = document.getElementById("errorTitulo");

    if (campo.value.trim() == "") {
        error.textContent = "El campo de búsqueda no puede estar vacío.";
        campo.setAttribute("class", "campoError");
        return false;
    } else {
        error.textContent = "";
        campo.setAttribute("class", "");
        return true;
    }
}

function enviarFormulario(evento) {
    evento.preventDefault();

    let resultados = document.getElementById("resultados");
    resultados.innerHTML = "";

    let valido = comprobarCampo();
    if (valido == false) {
        return;
    }

    let texto = document.getElementById("campoTitulo").value.trim().toLowerCase();
    let categoria = document.getElementById("campoCategoria").value.toLowerCase();
    let encontrados = 0;

    for (let i = 0; i < contenidos.length; i++) {
        let tituloVideo = contenidos[i].get("titulo").toLowerCase();
        let categoriaVideo = contenidos[i].get("categoria").toLowerCase();

        let coincideTitulo = false;
        if (tituloVideo.indexOf(texto) != -1) {
            coincideTitulo = true;
        }

        let coincideCategoria = false;
        if (categoria == "todas") {
            coincideCategoria = true;
        }
        if (categoria == categoriaVideo) {
            coincideCategoria = true;
        }

        if (coincideTitulo == true && coincideCategoria == true) {
            let tarjeta = crearTarjeta(contenidos[i]);
            resultados.appendChild(tarjeta);
            encontrados = encontrados + 1;
        }
    }

    if (encontrados == 0) {
        let mensaje = document.createElement("p");
        mensaje.textContent = "No se han encontrado vídeos con esa búsqueda.";
        resultados.appendChild(mensaje);
    }
}

// ---------- REPRODUCCIÓN ----------

function clicReproducir(evento) {
    evento.preventDefault();

    let id = evento.target.getAttribute("data-id");
    let videoEncontrado = null;

    for (let i = 0; i < contenidos.length; i++) {
        if (contenidos[i].get("id") == id) {
            videoEncontrado = contenidos[i];
        }
    }

    mostrarReproduccion(videoEncontrado);
}

function mostrarReproduccion(video) {
    zona.innerHTML = "";
    cabecera.textContent = "Reproducción " + video.get("titulo");

    let articulo = document.createElement("article");
    articulo.setAttribute("class", "zonaReproductor");

    let reproductor = document.createElement("video");
    reproductor.id = "reproductor";
    reproductor.setAttribute("controls", "controls");
    reproductor.width = 600;
    reproductor.poster = "imagenes/" + video.get("imagen");

    let fuente = document.createElement("source");
    fuente.src = "videos/" + video.get("video");
    fuente.type = "video/mp4";

    reproductor.appendChild(fuente);
    reproductor.appendChild(document.createTextNode("Tu navegador no soporta la reproducción de vídeo."));

    let botonPlay = document.createElement("button");
    botonPlay.textContent = "Reproducir";

    let botonPausa = document.createElement("button");
    botonPausa.textContent = "Pausar";

    let botonInicio = document.createElement("button");
    botonInicio.textContent = "Volver al inicio";

    botonPlay.addEventListener("click", pulsarPlay);
    botonPausa.addEventListener("click", pulsarPausa);
    botonInicio.addEventListener("click", pulsarInicio);

    articulo.appendChild(reproductor);
    articulo.appendChild(botonPlay);
    articulo.appendChild(botonPausa);
    articulo.appendChild(botonInicio);
    zona.appendChild(articulo);
}

function pulsarPlay() {
    document.getElementById("reproductor").play();
}

function pulsarPausa() {
    document.getElementById("reproductor").pause();
}

function pulsarInicio() {
    document.getElementById("reproductor").currentTime = 0;
}

mostrarInicio();
