const indicadores = require('./indicadores.json')
const agencias = require('../agencias/agencias.json');
const { findAgenciasId, findProductosId } = require('../utls/find_ids');

function relationship() {
    var _indicadores = JSON.parse(JSON.stringify(indicadores))
    _indicadores.forEach((indicador, i) => {
        indicador['agencias'] = indicador['agencias'];
        _indicadores[i] = indicador;
    });
    return _indicadores;
}

function getIndicadores(req, res) {
    var _indicadores = relationship()
    if (_indicadores)
        return res.send(_indicadores);
    else
        res.status(500).send('Internal server error');
}


function getIndicadoresById(req, res) {
    var _indicadores = relationship()
    try {
        var filter = _indicadores.find((indicador) => indicador['id'] == Number(req.params.id));

        if (filter) {
            if (filter["agencias"].length != 0)
                filter["agencias"] = findAgenciasId(filter['agencias'])
            return res.send(filter);
        }
        else
            return res.status(404).send('indicadores vacio');
    } catch (err) {
        console.error(`Errors getting indicadores `, err.message);
        res.status(500).send('Exploto!')
    }
}

module.exports = { getIndicadores, getIndicadoresById };
