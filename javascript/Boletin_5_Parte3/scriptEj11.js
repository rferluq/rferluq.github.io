    function sumarN() {
      let n = parseInt(document.getElementById("numero").value);
      let suma = 0;

      for (let i = 0; i <= n; i++) {
        suma += i;
      }

      document.getElementById("resultado").innerHTML =
        "La suma de 0 hasta " + n + " es: " + suma;
    }