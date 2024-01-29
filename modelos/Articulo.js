const {Schema , model} = require('mongoose');

//formato de cada uno de mis objetos que voy a guardar en mi base de datos
const ArticuloScheman = Schema ({
    titulo: {
        type: String, 
        require: true
    },
    contenido: {
        type: String,
        require: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    imagen:{
        type: String,
        default: 'default.png'
    }

})

//exporto el esquema
module.exports = model('Articulo',ArticuloScheman,'articulos')