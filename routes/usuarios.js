/*
    RUTA: /api/usarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuario, actualizarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);
router.post('/', [
        check('nombre', 'El usuario es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatorio').not().isEmpty(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearUsuario);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El usuario es obligatorio').not().isEmpty(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario);
module.exports = router