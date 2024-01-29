const mongoose = require("mongoose"); //importo moongose

const conexion = async() =>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/mi_blog');// cambie la palabra localhost por 127.0.0.1

        console.log('conectado correctamente a la base de datos');

    } catch(error){
        console.log(error);
        throw new Error ('no se a podido conectar a la base de datos');
    }
}

module.exports = {
    conexion
}