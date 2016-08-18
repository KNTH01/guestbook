'use strict'

const express = require('express')
const app = express()

const passport = require('passport')
const bodyParser = require('body-parser')
const session = require('express-session')
const nunjucks = require('nunjucks')
const objection = require('objection')
const Model = objection.Model
const Knex = require('knex')

const logger = require('./logger')

// override express logger
app.use(require('morgan')('tiny', { stream: logger.stream }))

// Initialize knex connection.
const knex = Knex({
  client: 'mysql',
  connection: require('./config/db')
})

// Give the connection to objection.
Model.knex(knex)

// template engine
app.set('view engine', 'njk')

nunjucks.configure(`${__dirname}/views`, {
  autoescape: true,
  watch: true, // should be true in dev mode only
  express: app
})

app.use('/assets', express.static('public'))

// set up bodyParser middleware
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// session middleware
app.use(session({
  secret: 'My secret secret cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  } // no https for now
}))

// passport init
app.use(passport.initialize())
app.use(passport.session())
require('./auth/initPassport')()

// middlewares
app.use(require('./middlewares/flash'))
app.use(require('./middlewares/auth'))

// routes
const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/users')
const messageRoutes = require('./routes/messages')
app.use('/', homeRoutes)
app.use('/users', userRoutes)
app.use('/messages', messageRoutes)

module.exports = app
