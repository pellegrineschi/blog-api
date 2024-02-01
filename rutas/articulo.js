const {Router} = require('express');
const router = Router();

const ArticuloController = require ('../controladores/articulo');

//rutas de prueba
router.get('/ruta-de-prueba',ArticuloController.prueba);

//rutas
router.post('/crear', ArticuloController.crear);

module.exports = router; 
