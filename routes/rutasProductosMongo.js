const express = require('express')
const { Router } = express
const Contenedor = require('../contenedores/contenedorMongoDB.js')
const contenedor = new Contenedor
const app = express()
const routerProductos = Router()



///-Productos-///


routerProductos.get('/', async (req, res) => {
    const productos = await contenedor.getProductos()
    res.json({ 
    productos    
    }) 
})


//Agrega un producto al listado
routerProductos.post('/', async (req, res) => {
    const {title,price,thumbnail,description,stock} = req.body
    const producto = {title,price,thumbnail,description,stock}
    const agregado = await contenedor.postProducto(producto)
    res.json({ 
        agregado
    }) 
})
//Actualiza producto
routerProductos.put('/:id', (req, res) => {
    const {title,price,thumbnail,description,stock} = req.body
    const obj = {title,price,thumbnail,description,stock}
    const actualizado = contenedor.updateById(obj)
    res.json({
        actualizado
    })
})

routerProductos.delete('/:id',async (req, res) => {
    const {id} = req.params
    const borrado = await contenedor.deleteById(id)   
    res.json({
           borrado
        })
})

module.exports = routerProductos