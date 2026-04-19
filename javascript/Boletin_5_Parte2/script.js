function ejercicio1() {
  document.getElementById("encabezado").textContent = "DOM Manipulado";
  document.getElementById("encabezado").style.color = "red";
  document.getElementById("encabezado").classList.add("titulo-activo");
}

function ejercicio2() {
  document.getElementById("parrafo").innerHTML = "<strong>Esto es un párrafo con texto añadido</strong>";}

function ejercicio3() {
  document.getElementById("celda1").textContent = "Nueva Celda 1";
  document.getElementById("celda2").textContent = "Nueva Celda 2";
}

function ejercicio4() {
  const act4 = document.querySelector("tr")
  const nueCeld = document.createElement("td");
  nueCeld.textContent= "soy Nueva";
  act4.appendChild(nueCeld);
}

function ejercicio5() {
  const act5 = document.querySelectorAll("td");
   //(Celda completa)style.backgroundColor="color";
  act5[0].style.color= "green";
  act5[1].style.color= "red";

}

function cambiaColor(event) {
  event.target.style.backgroundColor = "yellow";
}

function ejercicio6(){
  const act6 = document.querySelectorAll("td");
act6.forEach(celda => { celda.addEventListener("click",cambiaColor);})
}



