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

// auth services

// Google
router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'https://www.googleapis.com/auth/plus.login']
  }))

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  function (req, res) {
    req.flash('success', 'You have been authenticated with Google')
    res.redirect('/')
  })

// Github
router.get('/auth/github',
  passport.authenticate('github')
)

router.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/'
  }),
  function (req, res) {
    req.flash('success', 'You have been authenticated with Github')
    res.redirect('/')
  })

// Twitter
router.get('/auth/twitter', passport.authenticate('twitter'))

router.get('/auth/twitter/callback',
  passport.authenticate('twitter',
    {
      successRedirect: '/',
      failureRedirect: '/'
    }
  )
)

module.exports = router
