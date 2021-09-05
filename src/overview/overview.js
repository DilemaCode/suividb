// const _overview = require('./overview.json')
const agencias = require('../agencias/agencias.json')
const juegos = require('../juegos/juegos.json')
const productos = require('../productos/productos.json')
const { findJuegosId } = require('../utls/find_ids')

function geOverview(req, res) {
    // try {
    var _juegos = JSON.parse(JSON.stringify(juegos))
    _juegos.sort((a, b) => b.eficiencia - a.eficiencia);
    var _productos = JSON.parse(JSON.stringify(productos))

    var overview = {
        "total_ventas": 0,
        "porcentaje": 0,
        "productos": [],
        "juegos": []
    };
    var productosids = []
    var juegosids = []

    agencias.forEach(agencia => {
        overview['total_ventas'] += agencia['total_ventas']
        overview['porcentaje'] += agencia['porcentaje']
    });
    overview['porcentaje'] = Math.floor(overview['porcentaje'] / agencias.length)
    _juegos.forEach(juego => {
        var ojuegos = overview['juegos'];
        var id = ojuegos.findIndex((j) => j.name == juego.name)
        if (id == -1) {
            ojuegos.push(juego);
        } else {
            ojuegos['total_ventas'] += juego['total_ventas']
            ojuegos['eficiencia'] += juego['eficiencia']
        }
    });
    _productos.forEach(producto => {
        var oproductos = overview['productos'];
        var id = oproductos.findIndex((j) => j.name == producto.name)
        producto['juegos'] = findJuegosId(producto['juegos'])
        if (id == -1) {
            oproductos.push(producto);
        } else {
            oproductos['promedio'] += producto['promedio']
            oproductos['meta'] += producto['meta']

        }
    });

    // overview['juegos'] = juegos.map(juego => juegos.includes(juego['id']))
    // overview['productos'] = productos.map(producto => productos.includes(producto['id']))

    return res.send(overview);


    // } catch (error) {
    //     res.error('asdasd')
    // }
}


module.exports = { geOverview };
