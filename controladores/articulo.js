const fs = require("fs");
const path = require('path');
const validator = require("validator");
const Articulo = require("../modelos/Articulo");
const { default: mongoose } = require("mongoose");

const crear = async (req, res) => {
  //recoger parametros por post para guardar
  let parametro = req.body;
  //validar
  try {
    let validarTitulo =
      !validator.isEmpty(parametro.titulo) &&
      validator.isLength(parametro.titulo, { min: 5, max: 25 });
    let validarContenido = !validator.isEmpty(parametro.contenido);
    if (!validarTitulo || !validarContenido) {
      throw new Error("no se a validado la informacion");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "faltan datos",
    });
  }

  // crear el objeto a guardar
  const articulo = new Articulo(parametro);

  //guardar el articulo en la db
  try {
    const articuloGuardado = await articulo.save();
    return res.status(200).json({
      status: "success",
      articulo: articuloGuardado,
      mensaje: "articulo guardado",
    });
  } catch (error) {
    console.error("error al guardar el articulo", error);
    return res.status(400).json({
      status: "error",
      mensaje: "no se pudo guardar el archivo",
    });
  }
};

const obtenerTodos = async (req, res) => {
  try {
    const ultimos = req.params.cant;
    const articulos = await Articulo.find().sort({ fecha: -1 }).limit(ultimos); //traigo y ordeno de mandera desendente los ultimos alticulos que me llegan por parametro
    return res.status(200).json({
      status: "success",
      contador: articulos.length, //cuento la cantidad de objetos en el array
      articulos: articulos,
      mensaje: "Artículos obtenidos exitosamente",
    });
  } catch (error) {
    console.error("Error al obtener los artículos:", error);
    return res.status(500).json({
      status: "error",
      mensaje: "No se pudieron obtener los artículos",
    });
  }
};

const uno = async (req, res) => {
  let id = req.params.id;
  try {
    const articuloEncontrado = await Articulo.findById(id); //trae un articulo por el id
    if (articuloEncontrado) {
      return res.status(200).json({
        status: "success",
        articulo: articuloEncontrado,
        mensaje: "articulo econtrado",
      });
    } else {
      return res.status(400).json({
        status: "error",
        mensaje: "articulo no encontrado",
      });
    }
  } catch (error) {
    console.error("Error al obtener el artículo:", error);
    return res.status(500).json({
      status: "error",
      mensaje: "No se pudieron obtener el articulo",
    });
  }
};

const borrar = async (req, res) => {
  let articuloId = req.params.id;
  try {
    const articuloBorrar = await Articulo.findOneAndDelete({ _id: articuloId });
    if (articuloBorrar) {
      return res.status(200).json({
        status: "success",
        articulo: articuloBorrar,
        mensaje: "articulo borrado",
      });
    } else {
      return res.status(400).json({
        status: "error",
        mensaje: "no se encontro el articulo a borrar",
      });
    }
  } catch (error) {
    console.error("Error al borrar el artículo:", error);
    return res.status(500).json({
      status: "error",
      mensaje: "No se pudo borrar el articulo",
    });
  }
};

const editar = async (req, res) => {
  let articuloID = req.params.id;
  let parametro = req.body;
  try {
    let validarTitulo =
      !validator.isEmpty(parametro.titulo) &&
      validator.isLength(parametro.titulo, { min: 5, max: 25 });
    let validarContenido = !validator.isEmpty(parametro.contenido);
    if (!validarTitulo || !validarContenido) {
      throw new Error("no se a validado la informacion");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "faltan datos",
    });
  }

  try {
    const articuloUpdate = await Articulo.findOneAndUpdate(
      { _id: articuloID },
      parametro,
      { new: true }
    );
    if (articuloUpdate) {
      return res.status(200).json({
        status: "success",
        articulo: articuloUpdate,
        mensaje: "articulo actualizado",
      });
    } else {
      return res.status(400).json({
        status: "error",
        mensaje: "no se encontro el articulo a actualizar",
      });
    }
  } catch (error) {
    console.error("Error al actualizar el artículo:", error);
    return res.status(500).json({
      status: "error",
      mensaje: "No se pudo actualizar el articulo",
    });
  }
};

const subir = async (req, res) => {
  if (!req.file && !req.files) {
    return res.status(400).json({
      status: "error",
      mensaje: "peticion invalida",
    });
  }

  let archivo = req.file.originalname; //nombre del archivo
  let archivo_split = archivo.split(".");
  let extencion = archivo_split[1];

  if (extencion != "png" && extencion != "jpg" && extencion != "jpeg") {
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "error",
        mensaje: "imagen invalida",
      });
    });
  } else {
    let articuloID = req.params.id;

    try {
      const articuloUpdate = await Articulo.findOneAndUpdate(
        { _id: articuloID },
        { imagen: req.file.filename },
        { new: true }
      );
      if (articuloUpdate) {
        return res.status(200).json({
          status: "success",
          articulo: articuloUpdate,
          fichero: req.file,
        });
      } else {
        return res.status(400).json({
          status: "error",
          mensaje: "no se encontro el articulo a actualizar",
        });
      }
    } catch (error) {
      console.error("Error al actualizar el artículo:", error);
      return res.status(500).json({
        status: "error",
        mensaje: "No se pudo actualizar el articulo",
      });
    }
  }
};

const imagen = async(req, res) =>{
  let fichero = req.params.fichero
  let rutaFisica = './imagenes/articulos/' + fichero
  try{
    fs.stat(rutaFisica,(error, stat) =>{
      if(error){
        return res.status(400).json({
          status: error,
          mensaje:'la imagen no existe',
          existe,
          fichero,
          rutaFisica
        })
      }else{
        return res.sendFile(path.resolve(rutaFisica));  
      }    
      })

  }catch(error){
    return res.status(500).json({
      status: 'error',
      mensaje: 'error al obtener la imagen'
    })

  }
  }

  const buscador = async (req, res) =>{
      try{
      let busqueda = req.params.busqueda;
      
       const articulosEncontrados = await Articulo.find({"$or":[

          {'titulo':{'$regex': busqueda,'$options': 'i'}},
          {'contenido':{'$regex':busqueda,'$options': 'i'}}
        ]})
        .sort({fecha:-1})
        .exec()
          
            if(!articulosEncontrados || articulosEncontrados.length <= 0){
              return res.status(400).json({
                status: 'error',
                mensaje: 'articulo no encontrado'
              });
            }else {
              return res.status(200).json({
                status:'susses',
                mensaje: 'articulos encontrados',
                articulos: articulosEncontrados
              })
            }
          }catch(error){
            return res.status(500).json({
              status:'error',
              mensaje:'error al buscar los articulos'
            })
          }
        
          }

      

module.exports = {
  crear,
  obtenerTodos,
  uno,
  borrar,
  editar,
  subir,
  imagen,
  buscador
};
