    var FACTOR = 1.60934;

    function kmAMillas() {
      var km = parseFloat(document.getElementById("km").value);
      var millas = km / FACTOR;
      document.getElementById("resultado1").innerHTML =
        km + " km = " + millas.toFixed(4) + " millas";
    }

    function millasAKm() {
      var millas = parseFloat(document.getElementById("millas").value);
      var km = millas * FACTOR;
      document.getElementById("resultado2").innerHTML =
        millas + " millas = " + km.toFixed(4) + " km";
    }