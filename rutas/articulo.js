const {Router} = require('express');
const router = Router();

const ArticuloController = require ('../controladores/articulo');

//rutas
router.post('/crear', ArticuloController.crear);
router.get('/traer', ArticuloController.obtenerTodos);

module.exports = router; 
