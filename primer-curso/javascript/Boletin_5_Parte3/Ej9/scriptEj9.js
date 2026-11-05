    function contarCaracteres() {
      let texto = document.getElementById("texto").value;
      let numCaracteres = texto.length;

      document.getElementById("resultado").innerHTML =
        "La cadena contiene " + numCaracteres + " caracteres.";
    }