    function mostrarInfo() {
      var nombre = document.getElementById("nombre").value;
      var apellidos = document.getElementById("apellidos").value;
      var edad = parseInt(document.getElementById("edad").value);
      var anioNacimiento = new Date().getFullYear() - edad;
      var mensaje = "";

      if (edad >= 18) {
        mensaje = nombre + " " + apellidos + " tiene " + edad + " años y es mayor de edad. Nació en " + anioNacimiento + ".";
      } else {
        mensaje = nombre + " " + apellidos + " tiene " + edad + " años y es menor de edad. Nació en " + anioNacimiento + ".";
      }

      document.getElementById("resultado").innerHTML = mensaje;
    }