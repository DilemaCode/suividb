const express = require('express');
const { geOverview } = require('./src/overview/overview.js');
const { getAgencias, getAgenciasById } = require('./src/agencias/agencias.js');
const { getIndicadores, getIndicadoresById } = require('./src/indicadores/indicadores.js');
const { getProductosById, getProductos } = require('./src/productos/productos.js');
const { getJuegos, getJuegosById } = require('./src/juegos/juegos.js');
var app = express();
const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//     console.log('Received a GET HTTP method');
//     return res.send('Received a GET HTTP method');
// });

app.get('/overview', geOverview);

app.get('/agencias', getAgencias);
app.get('/agencias/:id', getAgenciasById);

app.get('/indicadores', getIndicadores);
app.get('/indicadores/:id', getIndicadoresById);

app.get('/productos', getProductos);
app.get('/productos/:id', getProductosById);

app.get('/juegos', getJuegos);
app.get('/juegos/:id', getJuegosById);



app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});