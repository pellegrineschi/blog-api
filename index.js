const {conexion} = require('./basedatos/conexion');
const express = require('express');
const cors = require('cors');

//inicia la app
console.log('app de node arrancada');

//conectar a la base de datos
conexion();

// crear servidor node
const app = express();
const puerto = 3900;

//configurar cors
app.use(cors());

// covertir body a objeto js
app.use(express.json());// recibir datos con conten-type app/json
app.use(express.urlencoded({extended:true})); //form-urlencoded

// crear rutas
const rutas_articulo = require('./rutas/articulo');

//cargando rutas
app.use('/api', rutas_articulo);  

// crear servidor y escuchar peticiones http
app.listen(puerto, () =>{
    console.log('el servidor esta corriendo en el puerto ' + puerto);
})
