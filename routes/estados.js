/*
    RUTA: /api/estados
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEstados, crearEstados, actualizarEstado } = require('../controllers/estados');

const router = Router();

router.get('/', getEstados);
router.post('/', [
        check('codigo', 'El código es obligatorio').not().isEmpty(),
        check('descripcion', 'la descripción es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearEstados);
router.put('/:id', [
    check('codigo', 'El código es obligatorio').not().isEmpty(),
    check('descripcion', 'la descripción es obligatoria').not().isEmpty(),
    validarCampos
], actualizarEstado)

module.exports = router;