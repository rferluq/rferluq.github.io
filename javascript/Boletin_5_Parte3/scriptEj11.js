    function sumarN() {
      var n = parseInt(document.getElementById("numero").value);
      var suma = 0;

      for (var i = 0; i <= n; i++) {
        suma += i;
      }

      document.getElementById("resultado").innerHTML =
        "La suma de 0 hasta " + n + " es: " + suma;
    }