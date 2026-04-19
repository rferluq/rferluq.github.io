    function mostrarFrase() {
      var nombre = document.getElementById("nombre").value;
      var provinciaAdjetivo = document.getElementById("provincia").value;
      var pueblo = document.getElementById("pueblo").value;

      document.getElementById("resultado").innerHTML =
        nombre + ", eres " + provinciaAdjetivo + " de " + pueblo + ".";
    }