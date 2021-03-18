const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'id nombre role estado');
    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    });
}

const crearUsuario = async(req, res = response) => {
    const { id, nombre, password, role } = req.body;
    try {
        const existeUsuario = await Usuario.findOne({ nombre });
        if (existeUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya se encuentra registrado'
            });
        }

        const usuario = new Usuario(req.body);
        console.log(usuario);


        //ENCRIPTAR CONTRASEÑAS
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        //GENERAR EL JWT
        const token = await generarJWT(usuario._id);
        await usuario.save();
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, ver logs',
        });
    }
}
const actualizarUsuario = async(req, res = response) => {
    // TODO: Validar token y comprobar si el usiario es correcto

    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid)
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese ID'
            });
        }
        //ACTUALIZACIONES
        const { password, nombre, ...campos } = req.body;

        if (usuarioDB.nombre != nombre) {
            const existeNombre = await Usuario.findOne({ nombre });
            if (existeNombre) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese nombre',
                });
            }
        }

        campos.nombre = nombre;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado',

        });
    }
}
module.exports = { getUsuarios, crearUsuario, actualizarUsuario }