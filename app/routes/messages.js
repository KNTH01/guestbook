'use strict'

const express = require('express')
const router = express.Router()
const moment = require('moment')

const Message = require('../models/Message')

router.get('/', (req, res) => {
  Message.query()
    .eager('user')
    .then(messages => {
      res.send({
        messages
      })
    })
})

router.post('/post', (req, res) => {
  let { content, createdAt } = req.body
  let user = req.user

  if (!user || user === undefined) {
    req.flash('error', 'Oh, you attempt to submit a message, but you are not loggued in !')
    res.redirect('/')
  }

  if (!content || content === '') {
    req.flash('error', 'Mmmh, your message is empty')
    res.redirect('/')
  }

  Message.query()
    .insert({
      content,
      userId: user.id,
      createdAt: moment(createdAt).format()
    })
    .then(message => {
      req.flash('success', 'Your message has been registered')
      res.redirect('/')
    })
    .catch(err => {
      console.error(err)
      req.flash('error', 'Your message has not been registered')
      res.redirect('/')
    })
})
module.exports = router
