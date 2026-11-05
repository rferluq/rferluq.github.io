const preguntas = document.querySelectorAll(".question");
const respuestas = [];
const botones = document.querySelectorAll(".boton");

const respuesta1 = document.createElement("p");
respuesta1.setAttribute("class", "oculto");
respuesta1.textContent = "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript.It's suitable for all levels and ideal for portfolio building.;"
const respuesta2 = document.createElement("p");
respuesta2.setAttribute("class", "oculto");
respuesta2.textContent = "Yes, Frontend Mentor offers both free and premium coding challenges, with the free option providing access to a range of projects suitable for all skill levels.";
const respuesta3 = document.createElement("p");
respuesta3.setAttribute("class", "oculto");
respuesta3.textContent = "Yes, you can use projects completed on Frontend Mentor in your portfolio. It's an excellent way to showcase your skills to potential employers!";
const respuesta4 = document.createElement("p");
respuesta4.setAttribute("class", "oculto");
respuesta4.textContent = "The best place to get help is inside Frontend Mentor's Discord community. There's a help channel where you can ask questions and seek support from other community members.";

respuestas.push(respuesta1, respuesta2, respuesta3, respuesta4);




botones.forEach((boton, i) => {
    let respuesta = respuestas[i];
    boton.addEventListener("click", () => {
        if (respuesta.getAttribute("class") == "oculto") {
            respuesta.setAttribute("class", "mostrado");
            preguntas[i].appendChild(respuesta);
            boton.setAttribute("src", "./assets/images/icon-minus.svg");
        } else {
            respuesta.setAttribute("class", "oculto");
            preguntas[i].appendChild(respuesta);
            boton.setAttribute("src", "./assets/images/icon-plus.svg");
        }
    })
})