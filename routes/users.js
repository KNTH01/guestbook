'use strict'

const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.get('/', (req, res) => {
  res.send('life')
})

router.post('/register', (req, res) => {
  // User.query()
  // .insert({
  // })
  // .then()
  res.send('register')
})

module.exports = router
