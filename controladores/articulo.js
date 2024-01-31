const prueba = (req, res) =>{
    return res.estatus(200).json({
        mensaje: 'prueba'
    })
} 

module.exports ={
    prueba
}