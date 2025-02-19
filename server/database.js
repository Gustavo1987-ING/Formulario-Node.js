const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, apellidos TEXT, dni TEXT, telefono TEXT, email TEXT, direccion TEXT, codigoPostal TEXT)");
});

function saveUser(user, callback) {
    const stmt = db.prepare("INSERT INTO users (nombre, apellidos, dni, telefono, email, direccion, codigoPostal) VALUES (?, ?, ?, ?, ?, ?, ?)");
    stmt.run(user.nombre, user.apellidos, user.dni, user.telefono, user.email, user.direccion, user.codigoPostal, function(err) {
        if (err) {
            callback({ success: false, error: err.message });
        } else {
            callback({ success: true });
        }
    });
    stmt.finalize();
}

function deleteUser(dni, callback) {
    db.run("DELETE FROM users WHERE dni = ?", dni, function(err) {
        if (err) {
            callback({ success: false, error: err.message });
        } else {
            callback({ success: true });
        }
    });
}

function getUsers(callback) {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            callback({ success: false, error: err.message });
        } else {
            callback({ success: true, users: rows });
        }
    });
}

module.exports = { saveUser, deleteUser, getUsers };