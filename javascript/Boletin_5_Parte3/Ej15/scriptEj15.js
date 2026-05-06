const agenda = new Map();

function agregarUsuario() {
    const nombre = document.getElementById('nombre').value;
    const dni = document.getElementById('dni').value;

    if (nombre.trim() === '' || dni.trim() === '') {
        alert('Por favor, completa todos los campos');
        return;
    }

    agenda.set(dni, nombre);
    
    document.getElementById('nombre').value = '';
    document.getElementById('dni').value = '';
    
    visualizarUsuarios();
}

function visualizarUsuarios() {
    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    if (agenda.size === 0) {
        lista.innerHTML = '<div class="vacio">No hay usuarios</div>';
        return;
    }

    agenda.forEach((nombre, dni) => {
        const div = document.createElement('div');
        div.className = 'usuario';
        
        div.innerHTML = `
            <div class="usuario-info">
                <span class="usuario-nombre">${nombre}</span>
                <span class="usuario-dni">DNI: ${dni}</span>
            </div>
        `;
        
        lista.appendChild(div);
    });
}

visualizarUsuarios();