const mongoose = require('mongoose')

const ProductosSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    trim: true,
    max: 50,
    
    },
    id: {
        type: Number,
        required: true,
        trim: true,
        max: 50000,
        
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        max: 50000,
        
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true,
        max: 500,
        
    },
    description: {
        type: String,
        required: true,
        trim: true,
        max: 500,
        
    },
    stock: {
        type: Number,
        required: true,
        trim: true,
        max: 500,
        
    }
})

module.exports = mongoose.model('Productos', ProductosSchema)