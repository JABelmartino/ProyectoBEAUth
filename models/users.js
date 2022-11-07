const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   id: Date ,
   email: String,
   password: String,
   name: String
})

module.exports = mongoose.model('Users', UserSchema)