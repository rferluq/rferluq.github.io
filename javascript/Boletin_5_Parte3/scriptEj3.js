    function mostrarEstacion() {
      var estaciones = ["invierno", "primavera", "verano", "otoño"];
      var numero = parseInt(document.getElementById("numero").value);

      if (numero >= 1 && numero <= 4) {
        document.getElementById("resultado").innerHTML = "<b>" + estaciones[numero - 1] + "</b>";
      } else {
        document.getElementById("resultado").innerHTML = "Por favor, introduce un número entre 1 y 4.";
      }
    }