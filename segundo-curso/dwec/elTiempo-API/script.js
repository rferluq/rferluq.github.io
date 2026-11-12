
const urlGeocoding = "https://geocoding-api.open-meteo.com/v1/search";
const urlPrevision = "https://api.open-meteo.com/v1/forecast";


const inputLocalidad = document.getElementById('localidad');
const botonBuscar = document.getElementById('btn-buscar');
const textoLocalidad = document.getElementById('nombre-localidad');

const tarjetaTemperaturaMaxima = document.getElementById('valor-tmax');
const tarjetaTemperaturaMinima = document.getElementById('valor-tmin');
const tarjetaPrecipitacion = document.getElementById('valor-lluvia');
const tarjetaViento = document.getElementById('valor-viento');

const nombreApi = document.getElementById('nombre-api');
const fechaConsulta = document.getElementById('fecha-consulta');

let grafico1 = null;
let grafico2 = null;
let grafico3 = null;
let grafico4 = null;

async function buscarCiudad(nombre) {
    const response = await fetch(
        urlGeocoding + "?name=" + encodeURIComponent(nombre) + "&count=1&language=es&format=json"
    );
    const datos = await response.json();


    if (!datos.results) {
        return null;
    }
    return datos.results[0];
}


async function fetchDatosTiempo(latitud, longitud) {
    const url = urlPrevision +
        "?latitude=" + latitud +
        "&longitude=" + longitud +
        "&daily=temperature_2m_max,temperature_2m_min," +
        "precipitation_sum,wind_speed_10m_max,weather_code" +
        "&forecast_days=7" +
        "&timezone=auto";

    const response = await fetch(url);
    const datos = await response.json();

    const fechas = datos.daily.time;
    const temperaturaMax = datos.daily.temperature_2m_max;
    const temperaturaMin = datos.daily.temperature_2m_min;
    const precipitacionMM = datos.daily.precipitation_sum;
    const vientoMax = datos.daily.wind_speed_10m_max;

    return { fechas, temperaturaMax, temperaturaMin, precipitacionMM, vientoMax };
}


function rellenarTarjetas(datos) {
    const tmax = Math.max(...datos.temperaturaMax);
    const tmin = Math.min(...datos.temperaturaMin);
    const lluvia = datos.precipitacionMM.reduce((total, valor) => total + valor, 0);
    const viento = Math.max(...datos.vientoMax);

    tarjetaTemperaturaMaxima.innerText = tmax;
    tarjetaTemperaturaMinima.innerText = tmin;
    tarjetaPrecipitacion.innerText = lluvia.toFixed(1);
    tarjetaViento.innerText = viento;
}


function createChart1(datos) {
    if (grafico1 != null) {
        grafico1.destroy();
    }

    const data1 = {
        labels: datos.fechas,
        datasets: [{
            label: 'Temperatura Máxima',
            data: datos.temperaturaMax,
            borderColor: 'rgba(255, 0, 55, 0.7)',
            tension: 0.5
        }, {
            label: 'Temperatura Mínima',
            data: datos.temperaturaMin,
            borderColor: 'rgba(0, 34, 255, 0.7)',
            tension: 0.5
        }]
    };

    const config1 = {
        type: 'line',
        data: data1,
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Temperaturas máxima y mínima (7 días)'
                }
            }
        }
    };

    grafico1 = new Chart(document.getElementById('grafico1'), config1);
}



function createChart2(datos) {
    if (grafico2 != null) {
        grafico2.destroy();
    }

    const data2 = {
        labels: datos.fechas,
        datasets: [{
            label: 'Precipitación (mm)',
            data: datos.precipitacionMM,
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(255, 0, 0, 0.7)',
                'rgba(255, 159, 64, 0.7)',
                'rgba(252, 0, 252, 0.7)'
            ]
        }]
    };

    const config2 = {
        type: 'bar',
        data: data2,
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Precipitación diaria (7 días)'
                }
            }
        }
    };

    grafico2 = new Chart(document.getElementById('grafico2'), config2);
}

function createChart3(datos) {
    if (grafico3 != null) {
        grafico3.destroy();
    }

    const data3 = {
        labels: datos.fechas,
        datasets: [{
            label: 'Viento máximo (km/h)',
            data: datos.vientoMax,
            borderColor: 'rgba(243, 156, 18, 0.9)',
            backgroundColor: 'rgba(243, 156, 18, 0.3)',
            fill: true,
            tension: 0.3
        }]
    };

    const config3 = {
        type: 'line',
        data: data3,
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Velocidad máxima del viento (7 días)'
                }
            }
        }
    };

    grafico3 = new Chart(document.getElementById('grafico3'), config3);
}


function createChart4(datos) {
    if (grafico4 != null) {
        grafico4.destroy();
    }

    const diasLluvia = datos.precipitacionMM.filter(valor => valor > 0).length;
    const diasSecos = datos.precipitacionMM.length - diasLluvia;

    const data4 = {
        labels: ['Días con lluvia', 'Días secos'],
        datasets: [{
            data: [diasLluvia, diasSecos],
            backgroundColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)'
            ]
        }]
    };

    const config4 = {
        type: 'doughnut',
        data: data4,
        options: {
            responsive: true,
            aspectRatio: 2.0,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Días con y sin lluvia (7 días)'
                }
            }
        }
    };

    grafico4 = new Chart(document.getElementById('grafico4'), config4);
}

function rellenarPie() {
    nombreApi.innerText = "Open-Meteo (open-meteo.com)";
    fechaConsulta.innerText = new Date().toLocaleString('es-ES');
}


async function cargarCiudad(nombre) {
    try {
        const ciudad = await buscarCiudad(nombre);

        if (ciudad == null) {
            textoLocalidad.innerText = "Localidad: no se ha encontrado \"" + nombre + "\"";
            return;
        }

        textoLocalidad.innerText = "Localidad: " + ciudad.name + " (" + ciudad.country + ")";

        const datos = await fetchDatosTiempo(ciudad.latitude, ciudad.longitude);

        rellenarTarjetas(datos);
        createChart1(datos);
        createChart2(datos);
        createChart3(datos);
        createChart4(datos);
        rellenarPie();
    } catch (error) {
        console.log("Error:", error);
        textoLocalidad.innerText = "Localidad: error al cargar los datos";
    }
}


// ===== Eventos =====
botonBuscar.addEventListener('click', function () {
    const nombre = inputLocalidad.value.trim();
    if (nombre != "") {
        cargarCiudad(nombre);
    }
});


inputLocalidad.addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter') {
        botonBuscar.click();
    }
});


cargarCiudad("Madrid");