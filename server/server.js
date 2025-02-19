const express = require('express');
const path = require('path'); // Importa el módulo 'path'
const { saveUser, deleteUser, getUsers } = require('./database');

const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

app.post('/addUser', (req, res) => {
    saveUser(req.body, (result) => {
        res.json(result);
    });
});

app.post('/deleteUser', (req, res) => {
    deleteUser(req.body.dni, (result) => {
        res.json(result);
    });
});

app.get('/getUsers', (req, res) => {
    getUsers((result) => {
        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});