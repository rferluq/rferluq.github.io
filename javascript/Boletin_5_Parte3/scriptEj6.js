function calcularIVA() {
      var nombre = document.getElementById("nombre").value;
      var cantidad = parseFloat(document.getElementById("cantidad").value);
      var iva = 0;
      var total = 0;

      if (cantidad >= 5000) {
        iva = 10;
      } else if (cantidad > 3000) {
        iva = 15;
      } else {
        iva = 21;
      }

      total = cantidad + (cantidad * iva / 100);

      document.getElementById("resultado").innerHTML =
        nombre + ", la cantidad final a pagar con un IVA del " + iva + "% es: " + total.toFixed(2) + " €";
    }