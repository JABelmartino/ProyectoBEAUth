const mongoose = require('mongoose')

const connectionDB = async () => {
    try {
        const url = 'mongodb://127.0.0.1:27017/ecommerce'
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('database connected')
    } catch (error) {
        console.error(error)
    }
}
module.exports = connectionDB

const connectionDBs = async () => {
    try {
        const url = 'mongodb://127.0.0.1:27017/sessions'
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('database connected')
    } catch (error) {
        console.error(error)
    }
}
module.exports = connectionDBs