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
const nodemailer = require("nodemailer");
const { createTransport } = require('nodemailer')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const http = require("http")
/*
httpServer.listen(8080, () =>{
  console.log(httpServer.address().port)
})
*/
if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`)
  for (let i = 0; i < numCPUs; i++) {
      cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`)
  })
} else {
  http.createServer((req, res) => {
      res.writeHead(200)
      res.end('hello world')
  }).listen(8080)
  
  console.log(`Worker ${process.pid} started`)
}


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


const TEST_MAIL = 'belmartinojulian@gmail.com'
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
      user: TEST_MAIL,
      pass: 'thhojhubxxqhkpvs'
  }
});

const mailOptions = {
  from:'Servidor de Node',
  to:TEST_MAIL,
  subject:'Mail de prueba',
  html:'<h1>Hola</h1>'
}
;(async () => {
try {
  const info = await transporter.sendMail(mailOptions)
  console.log(info)
} catch (error) {
  console.log(error)
}
})()

//thhojhubxxqhkpvs