const express = require('express')
const { Router } = express
const Contenedor = require('../contenedores/contenedorMongoCarrito.js')
const contenedor = new Contenedor
const app = express()
const routerCarrito = Router()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

///-Productos-///


routerCarrito.get('/', async (req, res) => {
    const carrito = await contenedor.getCarrito()
    res.json({ 
    carrito    
    }) 
})
/*
routerCarrito.get('/:id', async (req, res) => {
    const {id} = req.params
    const elegido = await contenedor.getId(id)
    if(elegido){
     res.json({elegido})
    }else{
        return {error:'No existe'}
    }
})*/
//Agrega un producto al carrito
routerCarrito.post('/id_carrito/productos/:id', async (req, res) => {
    const {id, id_carrito} = req.params
    const agregado = await contenedor.crearCarrito(id, id_carrito)
    res.json({ 
        agregado
    }) 
})
//Actualiza producto
routerCarrito.put('/:id', (req, res) => {
    let {id} = req.params
    const {title,price,thumbnail,description,stock} = req.body
    const obj = {id,title,price,thumbnail,description,stock}
    const actualizado = contenedor.updateById(obj)
    res.json({
        actualizado
    })
})

routerCarrito.delete('/:id',async (req, res) => {
    const {id} = req.params
    const borrado = await contenedor.deleteCarrito(id)   
    res.json({
           borrado
        })
})

routerCarrito.delete('/:id_carrito/productos/:id',async (req, res) => {
    const {id, id_carrito} = req.params
    const ids = {id_carrito, id}
    const borrado = await contenedor.deleteProductoCarrito(ids)   
    res.json({
           borrado
        })
})



module.exports = routerCarrito