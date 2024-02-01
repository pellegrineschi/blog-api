const validator = require("validator");

const crear = (req, res) => {
  //recoger parametros por post para guardar
  let paramametro = req.body;
  //validar
  try {
    let validarTitulo =
      !validator.isEmpty(paramametro.titulo) &&
      validator.isLength(paramametro.titulo, { min: 5, max: 15 });
    let validarContenido = !validator.isEmpty(paramametro.contenido);
        if(!validarTitulo || !validarContenido){
            throw new Error('no se a validado la informacion');
        }
  } catch (error) {
    return res.status(400).json({
      status: error,
      mensaje: "faltan datos",
    });
  }

  return res.status(200).json({
    mensaje: "metodo para crear",
    paramametro,
  });
};

const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: "soy una accion de prueba",
  });
};

module.exports = {
  prueba,
  crear,
};
