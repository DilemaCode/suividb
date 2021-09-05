const { findProductosId, findJuegosId } = require('../utls/find_ids');
const agencias = require('./agencias.json')

function relationship() {
    var _agencias = JSON.parse(JSON.stringify(agencias))
    _agencias.forEach((agencia, i) => {
        agencia['productos'] = findProductosId(agencia['productos']);
        agencia['juegos'] = findJuegosId(agencia['juegos']);
        _agencias[i] = agencia;
    });
    return _agencias;
}

function getAgencias(req, res) {
    var _agencias = relationship()
    if (_agencias)
        return res.send(_agencias);
    else
        res.status(500).send('Internal server error');
    return res.send(relationship());
}

function getAgenciasById(req, res, next) {
    var _agencias = relationship()
    try {
        var filter = _agencias.find((agencia) => agencia['id'] == Number(req.params.id));
        if (filter)
            return res.send(filter);
        res.status(404).send('Agencia no encontrada');
    } catch (err) {
        console.error(`Errors getting agencias `, err.message);
        res.status(500).send('Exploto!')
    }
}

module.exports = { getAgencias, getAgenciasById };
