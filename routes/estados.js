/*
    RUTA: /api/estados
*/
const { Router } = require('express');
const { getEstados,crearEstados} = require('../controllers/usuarios');

const router = Router();

router.get('/', getEstados);
router.post('/', crearEstados);

module.exports = router;