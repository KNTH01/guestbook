'use strict'

const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../models/User')

router.get('/', (req, res) => {
  res.send('life')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/'
}))

router.get('/logout', (req, res) => {
  req.logout()
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

router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  }))

router.get('/oauth2callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  function (req, res) {
    req.flash('success', 'google auth success')
    res.redirect('/')
  })

module.exports = router
