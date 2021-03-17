const { response, request } = require('express');
const estado = require('../models/estado');

const Estado = require('../models/estado');
const getEstados = async(req, resp) => {

    const estado = await Estado.find();
    resp.json({
        ok: true,
        estado
    });
}
const crearEstados = async(req, res = response) => {
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

const actualizarEstado = async(req, res = response) => {
    const uid = req.params.id;


    try {

        const estadoDB = await Estado.findById(uid);
        if (!estadoDB) { return res.status(404).json({ ok: false, msg: 'No existe un estado por ese id' }) }



        // TODO: Validar token y comprobar si el usiario es correcto

        //ACTUALIZACIONES
        const campos = request.body;

        const estadoActualizado = Estado.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            msg: "OK",
            estado: estadoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Eror inesperado",
        })
    }
}
module.exports = { getEstados, crearEstados, actualizarEstado }