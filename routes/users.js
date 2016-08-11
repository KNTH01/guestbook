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

  User.query()
    .where('email', '=', email)
    .then(user => {
      if (!user) {
        req.flash('error', 'Email not found')
        res.redirect('/')
      }
      if (user[0].password === password) {
        req.flash('success', 'You are loggued in')
        res.redirect('/')
      } else {
        req.flash('error', 'Bad credentials')
        res.redirect('/')
      }
    })
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
