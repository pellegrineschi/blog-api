const validator = require("validator");
const Articulo = require("../modelos/Articulo");
const { default: mongoose } = require("mongoose");

const crear = async(req, res) => {
  //recoger parametros por post para guardar
  let parametro = req.body;
  //validar
  try {
    let validarTitulo =
      !validator.isEmpty(parametro.titulo) &&
      validator.isLength(parametro.titulo, { min: 5, max: 25 });
    let validarContenido = !validator.isEmpty(parametro.contenido);
        if(!validarTitulo || !validarContenido){
            throw new Error('no se a validado la informacion');
        }
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      mensaje: "faltan datos",
    });
  }

  // crear el objeto a guardar
  const articulo = new Articulo(parametro);
  
  //guardar el articulo en la db
  try{
    const articuloGuardado = await articulo.save();
    return res.status(200).json({
      status: 'success',
      articulo: articuloGuardado,
      mensaje: 'articulo guardado'
    });
  }catch(error){
    console.error('error al guardar el articulo', error);
    return res.status(400).json({
      status: 'error',
      mensaje: 'no se pudo guardar el archivo'
    })
  }
  
};

const obtenerTodos = async (req, res) => {
  try {
    
    const ultimos = req.params.cant; 
      const articulos = await Articulo.find().sort({fecha: -1}).limit(ultimos);//traigo y ordeno de mandera desendente los ultimos alticulos que me llegan por parametro
      return res.status(200).json({
      status: 'success',
      contador: articulos.length,//cuento la cantidad de objetos en el array
      articulos: articulos,
      mensaje: 'Artículos obtenidos exitosamente',
    });
  } catch (error) {
    console.error('Error al obtener los artículos:', error);
    return res.status(500).json({
      status: 'error',
      mensaje: 'No se pudieron obtener los artículos',
    });
  }
};

module.exports = {
  crear,
  obtenerTodos
};









