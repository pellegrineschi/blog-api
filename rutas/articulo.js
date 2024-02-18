const {Router} = require('express');
const router = Router();
const multer = require('multer');

const ArticuloController = require ('../controladores/articulo');

const almacenamiento = multer.diskStorage({

    destination:(req, file, cb) =>{
        cb (null,'.imagenes/articulos');
        },
    filename:(req, file, cb) =>{
        cb (null,'articulo'+ Date.now()+file.originalname);
        }    
})

const subidas = multer({storage:almacenamiento});

//rutas
router.post('/crear', ArticuloController.crear);
router.get('/traer/:cant?', ArticuloController.obtenerTodos);//agrego parametro opcional
router.get('/articulo/:id', ArticuloController.uno);
router.delete('/articulo/:id', ArticuloController.borrar);
router.put('/articulo/:id', ArticuloController.editar); 
router.post('/subir-imagen/:id', ArticuloController.subir); 

module.exports = router; 
