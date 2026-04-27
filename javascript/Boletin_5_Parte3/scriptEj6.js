function calcularIVA() {
      let nombre = document.getElementById("nombre").value;
      let cantidad = parseFloat(document.getElementById("cantidad").value);
      let iva = 0;
      let total = 0;

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