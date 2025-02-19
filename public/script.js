document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const user = {
        nombre: document.getElementById('nombre').value,
        apellidos: document.getElementById('apellidos').value,
        dni: document.getElementById('dni').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        direccion: document.getElementById('direccion').value,
        codigoPostal: document.getElementById('codigoPostal').value
    };

    fetch('/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            addUserToTable(user);
            document.getElementById('userForm').reset();
        }
    })
    .catch(error => console.error('Error:', error));
});

function loadUsers() {
    fetch('/getUsers')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                data.users.forEach(user => addUserToTable(user));
            }
        })
        .catch(error => console.error('Error:', error));
}

function addUserToTable(user) {
    const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();

    row.insertCell(0).textContent = user.nombre;
    row.insertCell(1).textContent = user.apellidos;
    row.insertCell(2).textContent = user.dni;
    row.insertCell(3).textContent = user.telefono;
    row.insertCell(4).textContent = user.email;
    row.insertCell(5).textContent = user.direccion;
    row.insertCell(6).textContent = user.codigoPostal;

    const actionCell = row.insertCell(7);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.onclick = function() {
        fetch('/deleteUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dni: user.dni })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                table.deleteRow(row.rowIndex - 1);
            }
        })
        .catch(error => console.error('Error:', error));
    };
    actionCell.appendChild(deleteButton);
}