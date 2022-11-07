const mongoose = require('mongoose')

const CarritosProductosSchema = new mongoose.Schema({
title: {
    type: String,
    trim: true,
    },
    price: {
        type: Number,
        trim: true,
        max: 50000,
        
    },
    id: {
        type: Number,
        required: true,
        trim: true,
        max: 50000,
        
    },
    thumbnail: {
        type: String,
        trim: true,
        
    },
    description: {
        type: String,
        trim: true,
        
    },
    stock: {
        type: Number,
        trim: true,
    }
})
module.exports = mongoose.model('CarritoProductos', CarritosProductosSchema)

const CarritosSchema = new mongoose.Schema({
        id_carrito: {
        type: Number,
        }, 
        productos: {
        type: [CarritosProductosSchema],
        },
        time:{
            type: Date,
        }
       
})

module.exports = mongoose.model('Carritos', CarritosSchema)
