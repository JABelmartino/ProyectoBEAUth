const Productos = require('../models/ecommerce.js')
const Carrito = require('../models/ecommerceCarrito.js')
const connectionDB = require('../config.js')
const { timeStamp } = require('console')
const { updateOne } = require('../models/ecommerce.js')


class Contenedor{
    constructor(){
      
    }
    
    async getProductos(){
        try{
            const productos = await Productos.find()
            console.log(productos)

        }catch(error){
            console.log(error)
        }
    }

    async postProducto(producto){
        try{
            let nuevoProducto = new Productos({
                title: `${producto.title}`,
                price: `${producto.price}`,
                thumbnail: `${producto.thumbnail}`,
                description: `${producto.description}`,
                stock: `${producto.stock}`
            })
            await nuevoProducto.save()
            console.log(nuevoProducto)

        }catch(error){
            console.log(error)
        }
    }

    
    async updateById(obj){
        try{
            await Productos.updateOne({title : 'Gorra Roja2'},{$set: {title: `${obj.title}`,  price :`${obj.price}`,  description :`${obj.description}`,  stock :`${obj.stock}`}})
            console.log(obj)

        }catch(error){
            console.log(error)
        }
    }


    async deleteById(id){
        try{
            let productoBorrado = await Productos.deleteOne({id: `${id}`})
            console.log(productoBorrado)

        }catch(error){
            console.log(error)
        }
    }

    async getCarrito(){
        try{
            const carrito = await Carrito.find()
            console.log(carrito)

        }catch(error){
            console.log(error)
        }
    }
    async deleteCarrito(id){
        try {
            let carritoBorrado = await Carrito.deleteOne({id_carrito: `${id}`})
            console.log(carritoBorrado)
        } catch (error) {
            console.log(error)
        }
    }

    async crearCarrito(){
        try{
            let nuevoCarrito = new Carrito({
                id_carrito: 3,
                time: new Date(),
                productos: []

            })
            await nuevoCarrito.save()
            console.log(nuevoCarrito)

        }catch(error){
            console.log(error)
        }
    }

    async agregarProducto(id_carrito, id){
        try{
            const objindex = Producto.find(prod => prod.id == id)
            const carritoApuntado = Carrito.find(prod => prod.id_carrito == id_carrito)
            const carritoDestino = carritoApuntado.productos
            objindex.time = new Date()
            
            let nuevoCarritoProductos = new CarritoProductos({
                title: `${objindex.title}`,
                price: `${objindex.price}`,
                thumbnail: `${objindex.thumbnail}`,
                description: `${objindex.description}`,
                stock: `${objindex.stock}`
            })
            await nuevoProducto.save()
            console.log(nuevoCarritoProductos)

        }catch(error){
            console.log(error)
        }
    }

}



    
module.exports = Contenedor