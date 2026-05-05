    const recetas = [
      { id: 1, nombrereceta: "Salmorejo", ingredientes: "tomate,aceite,pan" },
      { id: 2, nombrereceta: "Gachas", ingredientes: "harina,agua,azucar" },
      { id: 3, nombrereceta: "Migas", ingredientes: "pan,ajos,aceite" }
    ];

    function mostrarRecetas() {
      let html = "<table border='1'>";
      html += "<tr><th>ID</th><th>Nombre receta</th><th>Ingredientes</th></tr>";

      for (let i = 0; i < recetas.length; i++) {
        html += "<tr>";
        html += "<td>" + recetas[i].id + "</td>";
        html += "<td>" + recetas[i].nombrereceta + "</td>";
        html += "<td>" + recetas[i].ingredientes + "</td>";
        html += "</tr>";
      }

      html += "</table>";
      document.getElementById("resultado").innerHTML = html;
    }