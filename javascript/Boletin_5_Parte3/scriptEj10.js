    function compararPalabras() {
      var palabra1 = document.getElementById("palabra1").value;
      var palabra2 = document.getElementById("palabra2").value;

      if (palabra1.length > palabra2.length) {
        alert("La palabra más larga es: \"" + palabra1 + "\" con " + palabra1.length + " caracteres.");
      } else if (palabra2.length > palabra1.length) {
        alert("La palabra más larga es: \"" + palabra2 + "\" con " + palabra2.length + " caracteres.");
      } else {
        alert("Las dos palabras tienen la misma longitud: " + palabra1.length + " caracteres.");
      }
    }