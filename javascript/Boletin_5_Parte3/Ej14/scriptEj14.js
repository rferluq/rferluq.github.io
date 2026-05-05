function agregar(valor) {
    const pantalla = document.getElementById('pantalla');
    pantalla.value += valor;
}

function borrar() {
    document.getElementById('pantalla').value = '';
}

function retroceder() {
    const pantalla = document.getElementById('pantalla');
    pantalla.value = pantalla.value.slice(0, -1);
}

function calcular() {
    const pantalla = document.getElementById('pantalla');
    try {
        pantalla.value = eval(pantalla.value);
    } catch (error) {
        pantalla.value = 'Error';
    }
}