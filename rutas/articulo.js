const {Router} = require('express');
const router = Router();

const ArticuloController = require ('../controladores/articulo');

//rutas
router.post('/crear', ArticuloController.crear);

module.exports = router; 
