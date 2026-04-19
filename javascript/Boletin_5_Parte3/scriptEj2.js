 function comprobarDivisible() {
      var numero = parseInt(document.getElementById("numero").value);
      var div = document.getElementById("resultado");
      div.style.display = "block";

      if (numero % 2 === 0) {
        div.innerHTML = "El número " + numero + " ES divisible por dos.";
      } else {
        div.innerHTML = "El número " + numero + " NO es divisible por dos.";
      }
    }