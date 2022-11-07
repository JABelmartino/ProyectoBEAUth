if(process.env.NODE !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const { Router } = express
const app = express()
const routerLogin = Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('../passport.config')
const methodOverride = require('method-override')
const Users = require('../models/users.js')


initializePassport(passport,
  email => Users.find(user => user.email === email),
  id => Users.find(user => user.id === id)
  )
  
  

///-Productos-///
routerLogin.get('/', checkAuthenticated, async (req, res) => {
  
    res.render('index') 
  })
 
  routerLogin.get('/login', checkNotAuthenticated, async (req, res) => {
  res.render('login') 
})

routerLogin.post('/login', checkNotAuthenticated, passport.authenticate('local',{
successRedirect: '/',
failureRedirect: 'login',
failureFlash: true
}))

routerLogin.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    let nuevoUser = new Users({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    await nuevoUser.save()
    res.redirect('/login')
    return nuevoUser
  } catch (err) {
    console.log(err)
    res.redirect('/register')
  }
  
})

routerLogin.get('/register', async (req, res) => {
   
res.render('register') 
})

routerLogin.delete('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
} 

module.exports = routerLogin