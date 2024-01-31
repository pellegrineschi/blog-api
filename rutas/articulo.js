const express = require('express');
const router = express.Router();

const ArticuloControler = require ('../controladores/articulo.js');

//ruta de pruebas
router.get('ruta-de-prueb',ArticuloControler.prueba);

module.exports = router;