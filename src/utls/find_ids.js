const agencias = require('../agencias/agencias.json')
const juegos = require('../juegos/juegos.json')
const productos = require('../productos/productos.json')


function findAgenciasId(array) {
    var _agencias = [];
    array.map(id =>
        _agencias.push(agencias.find(p => p.id == id)));
    return _agencias;
}

function findProductosId(array) {
    var _productos = [];
    array.map(id =>
        _productos.push(productos.find(p => p.id == id)));
    return _productos;
}

function findJuegosId(array) {
    var alljuegos = JSON.parse(JSON.stringify(juegos))
    var _juegos = [];
    array.map(id => alljuegos.find(p => p.id == id) &&
        _juegos.push(alljuegos.find(p => p.id == id)));
    _juegos.sort((a, b) => b.eficiencia - a.eficiencia);
    return _juegos;
}

module.exports = {
    findAgenciasId,
    findProductosId,
    findJuegosId
}