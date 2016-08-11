'use strict'

const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.get('/', (req, res) => {
  res.send('life')
})

router.post('/login', (req, res) => {
  let {
    email,
    password
  } = req.body

  User.login(email, password)
    .then((result) => {
      req.flash('success', result.message)
      req.session.user = result.user
      res.redirect('/')
    })
    .catch(message => {
      console.error(message)
      req.flash('error', message)
      res.redirect('/')
    })
})

router.get('/logout', (req, res) => {
  req.session.user = undefined
  req.flash('success', 'You have been logged out')
  res.redirect('/')
})

router.post('/register', (req, res) => {
  let {
    email,
    password,
    password2,
    firstName,
    lastName
  } = req.body

  if (password === password2) {
    User.query()
      .insert({
        email,
        password,
        firstName,
        lastName
      })
      .then(user => {
        req.flash('success', `User ${user.firstName} successfully registered !`)
        res.redirect('/')
      })
  } else {
    req.flash('error', 'Passwords do not match !')
    res.redirect('/')
  }
})

module.exports = router
