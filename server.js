if(process.env.NODE !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const { Router } = express
const Contenedor = require("./contenedor");
const contenedor = new Contenedor('./productos.txt')
const contenedor2 = new Contenedor('./mensajes.txt')
const {Server: HTTPServer} = require('http')
const bcrypt = require('bcrypt')
const passport = require('passport')
const app = express()
const logger = require('log4js')
const httpServer = new HTTPServer(app)
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('./passport.config')
const methodOverride = require('method-override')
const connectionDB = require('./config.js')
connectionDB()
const connectionDBs = require('./config.js')
connectionDBs()


httpServer.listen(8080, () =>{
  console.log(httpServer.address().port)
})
httpServer.on('error', err => console.log(err))

  app.set('views','./views')
  app.set('view engine', 'ejs')
  
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(express.static('public'));
  app.use(flash())
app.use(session({
secret: process.env.SESSION_SECRET ,
resave: false,
saveUninitialized: false 
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

const routerProductos = require('./routes/rutasProductosMongo.js')
const routerCarrito = require('./routes/rutasCarritoMongo.js')
const routerLogin = require('./routes/rutaslogin.js')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

app.use('/productos', routerProductos)
app.use('/carrito', routerCarrito)
app.use('/', routerLogin)

app.use('/', routerProductos)


