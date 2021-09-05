const juegos = require('./juegos.json')
// import juegos from 

function getJuegos(req, res) {
    var _juegos = JSON.parse(JSON.stringify(juegos))
    _juegos.sort((a, b) => b.eficiencia - a.eficiencia);
    
    return res.send(_juegos);
}

function getJuegosById(req, res) {
    try {
        var filter =
            juegos.filter((juego) => juego['id'] == req.params.id);
        return res.send(filter)
    } catch (err) {
        console.error(`Errors getting juegos `, err.message);
        // next(err);
    }
}

module.exports = { getJuegos, getJuegosById };
