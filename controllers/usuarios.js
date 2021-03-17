const { response } = require('express');

const Estado = require('../models/estado');
const getEstados = async (req, resp) => {
    const estado = await Estado.find();
    resp.json({
        ok: true,
        estado
    });
}
const crearEstados = async (req, res = response) => {
    const { id, codigo, descripcion, descripcion2 } = req.body;

    try {

        const existeCodigo = await Estado.findOne({ codigo });
        if (existeCodigo) { return res.status(400).json({ ok: false, msg: "El código ya esta registrado..." }); }
        const estado = new Estado(req.body);
        await estado.save();

        resp.json({
            ok: true,
            estado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, revisar logs"
        });
    }


}
module.exports = { getEstados, crearEstados }