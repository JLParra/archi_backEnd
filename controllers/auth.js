const { response } = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const { nombre, password } = req.body;
    try {

        const usuarioDB = await Usuario.findOne({ nombre });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales incorrectos'
            });
        }

        //VERIFICAR CONTRASEÑAS
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validarPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales incorrectos'
            });
        }

        //VERIFICAR ESTADO
        if (usuarioDB.estado != 1) {
            return res.status(404).json({
                ok: false,
                msg: '[601] - Contactarse con el Administrador'
            });
        }

        //GENERAR EL JWT
        const token = await generarJWT(usuarioDB._id);


        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = { login };