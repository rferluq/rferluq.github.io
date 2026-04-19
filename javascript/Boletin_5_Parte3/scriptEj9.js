    function contarCaracteres() {
      var texto = document.getElementById("texto").value;
      var numCaracteres = texto.length;

      document.getElementById("resultado").innerHTML =
        "La cadena contiene " + numCaracteres + " caracteres.";
    }