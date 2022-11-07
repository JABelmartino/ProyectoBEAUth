const Productos = require('../models/ecommerce.js')
const Carrito = require('../models/ecommerceCarrito.js')
const connectionDB = require('../config.js')
const { timeStamp } = require('console')


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
            const obj = carritoDestino.push(objindex) 
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

    async deleteProductoCarrito(ids){
        try {
            let carritoBorrado = await Carrito.find({id_carrito: `${ids.id_carrito}`})
            let objetos = await carritoBorrado.map(function(productos,carritoBorrado ){
             return(productos.productos)
            })
            const [arrayArreglado] = objetos
            let finalBorrado = await arrayArreglado.filter(cart => cart.id == ids.id)
            
            let numeroId = ids.id
            const numeroparseado = parseInt(numeroId)
           
           let ProductoBorrado = await Carrito.updateOne({ id_carrito: {$eq: 2 }},{$pull: {"productos.$id": {"id": {$eq: numeroparseado }}}})
           
        } catch (error) {
            console.log(error)
        }
    }
    /*
    async updateProductoCarrito(ids){
        try {
            let carritoActualizado = await Carrito.updateOne({})
            console.log(carritoActualizado)
        } catch (error) {
            console.log(error)
        }
    }
*/
}



    
module.exports = Contenedor