const selector = document.getElementById("parejasSeleccionadas");
const gatos = ["./images/cat1.jpg", "./images/cat2.jpg", "./images/cat3.jpg", "./images/cat4.jpg", "./images/cat5.jpg", "./images/cat6.jpg", "./images/cat7.jpg", "./images/cat8.jpg", "./images/cat9.jpg", "./images/cat10.jpg", "./images/cat11.jpg", "./images/cat12.jpg", "./images/cat13.jpg", "./images/cat14.jpg", "./images/cat15.jpg", "./images/cat16.jpg", "./images/cat17.jpg", "./images/cat18.jpg", "./images/cat19.jpg", "./images/cat20.jpg"];
let caraCartas = new Map();
let intervaloReloj;
var segundosUnidad = 0;
var segundosDecena = 0;
var minutosUnidad = 0;
var minutosDecena = 0;
var cartasSeleccionadas = 0;
let primeraCartaClickada;
for (let i = 2; i <= 20; i++) {
    selector.innerHTML += `<option value="${i}">${i}</option>`;
};

const bloqueReloj = document.createElement("div");
bloqueReloj.setAttribute("class", "reloj");
const reloj = document.createElement("h1");
bloqueReloj.appendChild(reloj);
reloj.textContent = "" + minutosDecena + minutosUnidad + ":" + segundosDecena + segundosUnidad;
const botonJugar = document.createElement("button");
const bloqueCartas = document.createElement("div");
bloqueCartas.setAttribute("class", "bloqueCartas");
const botonStart = document.createElement("button");
botonStart.setAttribute("class", "start");
botonStart.textContent = "START";


function generarCartas() {
    const numeroDeCartas = selector.value;
    const gatosDisponibles = gatos.slice(0, numeroDeCartas);
    gatosDisponibles.forEach(gato => {
        caraCartas.set(gato, 0);
    });
    const contenedor = document.getElementById("main");
    contenedor.setAttribute("class", "main");

    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    bloqueCartas.innerHTML = "";



    for (let i = 0; i < numeroDeCartas * 2; i++) {
        const reverso = document.createElement("img");
        const carta = document.createElement("img");
        reverso.setAttribute("src", "images/reverso.jpg");
        reverso.setAttribute("class", "visible");
        carta.setAttribute("id", "carta" + i);
        carta.setAttribute("class", "oculto");
        asignarCarta(carta, gatosDisponibles);
        bloqueCartas.appendChild(reverso);
        bloqueCartas.appendChild(carta);

    }
    contenedor.appendChild(bloqueCartas);
    contenedor.appendChild(bloqueReloj);



    contenedor.appendChild(botonStart);

    botonStart.addEventListener("click", (e) => {
        botonStart.disabled = true;
        intervaloReloj = setInterval(() => {
            if (segundosDecena < 6) {
                if (segundosUnidad < 9) {
                    segundosUnidad += 1;
                    reloj.textContent = "" + minutosDecena + minutosUnidad + ":" + segundosDecena + segundosUnidad;
                } else {
                    segundosUnidad = 0;
                    segundosDecena += 1;
                    reloj.textContent = "" + minutosDecena + minutosUnidad + ":" + segundosDecena + segundosUnidad;
                }
            } else {
                segundosUnidad = 0;
                segundosDecena = 0;
                if (minutosUnidad < 9) {
                    minutosUnidad += 1;
                    reloj.textContent = "" + minutosDecena + minutosUnidad + ":" + segundosDecena + segundosUnidad;
                } else {
                    minutosUnidad = 0;
                    minutosDecena += 1;
                    reloj.textContent = "" + minutosDecena + minutosUnidad + ":" + segundosDecena + segundosUnidad;
                }
            }
        }, 1000);

        const todasCartas = document.querySelectorAll(".visible");
        todasCartas.forEach((reverso, i) => {
            let cartaClickada = document.querySelectorAll(".oculto")[i];

            reverso.addEventListener("click", () => {
                reverso.setAttribute("class", "oculto");
                cartaClickada.setAttribute("class", "visible");
                cartasSeleccionadas += 1;
                if (cartasSeleccionadas == 1) {
                    primeraCartaClickada = cartaClickada;

                } else if (cartasSeleccionadas == 2) {
                    if (primeraCartaClickada.getAttribute("src") === cartaClickada.getAttribute("src")) {
                        cartasSeleccionadas = 0;
                        primeraCartaClickada = null;

                        const totalGatos = bloqueCartas.getElementsByTagName("img").length / 2;

                        const elementosVisibles = bloqueCartas.querySelectorAll(".visible");
                        let gatosDescubiertos = 0;

                        elementosVisibles.forEach(img => {
                            if (img.getAttribute("src") !== "images/reverso.jpg") {
                                gatosDescubiertos++;
                            }
                        });

                        if (gatosDescubiertos === totalGatos) {
                            clearInterval(intervaloReloj);
                            alert("¡Felicidades! Has ganado");
                        }
                    } else {
                        setTimeout(() => {
                            reverso.setAttribute("class", "visible");
                            cartaClickada.setAttribute("class", "oculto");

                            let primerReverso = primeraCartaClickada.previousElementSibling;
                            primerReverso.setAttribute("class", "visible");
                            primeraCartaClickada.setAttribute("class", "oculto");

                            cartasSeleccionadas = 0;
                            primeraCartaClickada = null;
                        }, 1000);
                    }
                }



            });
        });

    });
}


function asignarCarta(carta, gatosDisponibles) {
    let bucle = false;
    while (!bucle) {
        let numRandom = Math.floor(Math.random() * gatosDisponibles.length);
        let gatoSeleccionado = gatosDisponibles[numRandom];
        let repetido = caraCartas.get(gatoSeleccionado);
        if (repetido < 2) {
            carta.setAttribute("src", gatoSeleccionado);
            caraCartas.set(gatoSeleccionado, repetido + 1);
            bucle = true;
        }
    }
}

