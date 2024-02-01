const crear = (req, res) =>{
    let paramametro = req.body;

    return res.status(200).json({
        mensaje: 'metodo para crear',
        paramametro

    });
}


const prueba = (req, res) =>{
    return res.status(200).json({
        mensaje: 'soy una accion de prueba'
    });
}

module.exports = {
    prueba,
    crear
}