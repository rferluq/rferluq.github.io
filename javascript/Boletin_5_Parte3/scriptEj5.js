 function mostrarEstacion() {
      let mes = document.getElementById("mes").value.toLowerCase().trim();
      let estacion = "";
      let div = document.getElementById("resultado");

      if (mes === "diciembre" || mes === "enero" || mes === "febrero") {
        estacion = "Invierno";
      } else if (mes === "marzo" || mes === "abril" || mes === "mayo") {
        estacion = "Primavera";
      } else if (mes === "junio" || mes === "julio" || mes === "agosto") {
        estacion = "Verano";
      } else if (mes === "septiembre" || mes === "octubre" || mes === "noviembre") {
        estacion = "Otoño";
      } else {
        estacion = "Mes no reconocido";
      }

      div.style.display = "block";
      div.innerHTML = estacion;
    }