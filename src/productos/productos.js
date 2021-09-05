const { findJuegosId } = require('../utls/find_ids');
const productos = require('./productos.json')
// import productos from 

function relationship() {
    var _productos = JSON.parse(JSON.stringify(productos))
    _productos.forEach((producto, i) => {
        producto['juegos'] = findJuegosId(producto['juegos']);
        producto['juegos'].sort((a, b) => b.eficiencia - a.eficiencia);
        _productos[i] = producto;
    });
    return _productos;
}

function getProductos(req, res) {
    var _productos = relationship()
    if (_productos)
        return res.send(_productos);
    else
        res.status(500).send('Internal server error');
}

function getProductosById(req, res) {
    var _productos = relationship()
    try {
        var filter = _productos.find((producto) => producto['id'] == Number(req.params.id));
        if (filter)
            return res.send(filter);
        res.status(404).send('indicador no encontrado');
    } catch (err) {
        console.error(`Errors getting prod_productos `, err.message);
        res.status(500).send('Exploto!')
    }
}

module.exports = { getProductos, getProductosById };
