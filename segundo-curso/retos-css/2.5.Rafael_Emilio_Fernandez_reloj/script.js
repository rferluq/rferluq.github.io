function actualizar() {
    var ahora = new Date();
    var h = ahora.getHours();
    var m = ahora.getMinutes();
    var s = ahora.getSeconds();

    var gradosSeg = s * 6; // 360/60=6
    var gradosMin = m * 6 + s * 0.1; // 360/60=6 + 6/60=0.1 para que avance cada segundo poco a poco
    var gradosHora = (h % 12) * 30 + m * 0.5; // WS

    document.getElementById("segundos").style.transform = "rotate(" + gradosSeg + "deg)";
    document.getElementById("minutos").style.transform = "rotate(" + gradosMin + "deg)";
    document.getElementById("horas").style.transform = "rotate(" + gradosHora + "deg)";

    document.getElementById("digital").textContent = ahora.toLocaleTimeString("es-ES");
}

actualizar();
setInterval(actualizar, 1000);
