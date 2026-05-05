    function mostrarInfo() {
      let nombre = document.getElementById("nombre").value;
      let apellidos = document.getElementById("apellidos").value;
      let edad = parseInt(document.getElementById("edad").value);
      let anioNacimiento = new Date().getFullYear() - edad;
      let mensaje = "";

      if (edad >= 18) {
        mensaje = nombre + " " + apellidos + " tiene " + edad + " años y es mayor de edad. Nació en " + anioNacimiento + ".";
      } else {
        mensaje = nombre + " " + apellidos + " tiene " + edad + " años y es menor de edad. Nació en " + anioNacimiento + ".";
      }

      document.getElementById("resultado").innerHTML = mensaje;
    }