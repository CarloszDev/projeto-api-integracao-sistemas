const express = require('express');
const apiRoutes = require('./api/routes');

const app = express();


app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: "Bem-vindo à API de Alerta de Alagamentos. Acesse /api/alerts para interagir." });
});

app.use('/api', apiRoutes);

module.exports = app;