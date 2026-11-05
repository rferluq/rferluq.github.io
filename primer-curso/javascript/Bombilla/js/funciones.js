function interruptor() {
    const img = document.getElementById('bombillaimagen');
    const btn = document.getElementById('bombillaboton');

    if (img.src.includes('off.jpg')) {
        img.src = 'images/on.jpg';
        btn.textContent = 'Apagar';
    } else {
        img.src = 'images/off.jpg';
        btn.textContent = 'Encender';
    }
}