 function mostrarEstacion() {
      let mes = document.getElementById("mes").value.toLowerCase().trim();
      let estacion = "";
      let div = document.getElementById("resultado");

      switch (mes) {
        case "diciembre":
        case "enero":
        case "febrero":
          estacion = "Invierno";
          break;
        case "marzo":
        case "abril":
        case "mayo":
          estacion = "Primavera";
          break;
        case "junio":
        case "julio":
        case "agosto":
          estacion = "Verano";
          break;
        case "septiembre":
        case "octubre":
        case "noviembre":
          estacion = "Otoño";
          break;
        default:
          estacion = "Mes no reconocido";
      }

      div.style.display = "block";
      div.innerHTML = estacion;
    }