const validator = require("validator");
const Articulo = require("../modelos/Articulo");

const crear = (req, res) => {
  //recoger parametros por post para guardar
  let parametro = req.body;
  //validar
  try {
    let validarTitulo =
      !validator.isEmpty(parametro.titulo) &&
      validator.isLength(parametro.titulo, { min: 5, max: 15 });
    let validarContenido = !validator.isEmpty(paramametro.contenido);
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
  articulo.save((error, articuloGuardado)=>{

    if(error || !articuloGuardado){
      return res.status(400).json({
        status: 'error',
        mensaje: "no se guardo el articulo"
      });
    }

    return res.status(200).json({
      status: 'success',
      articulo: articuloGuardado,
      mensaje:'guardado con exito'
    });
  })

  
};



module.exports = {
  crear
};
