    function mostrarFrase() {
      let nombre = document.getElementById("nombre").value;
      let provinciaAdjetivo = document.getElementById("provincia").value;
      let pueblo = document.getElementById("pueblo").value;

      document.getElementById("resultado").innerHTML =
        nombre + ", eres " + provinciaAdjetivo + " de " + pueblo + ".";
    }