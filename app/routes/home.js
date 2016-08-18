'use strict'

const express = require('express')
const router = express.Router()

const Message = require('../models/Message')
const logger = require('../logger')

router.get('/', (req, res) => {
  Message.query()
    .eager('user')
    .then(messages => {
      res.render('pages/index', {
        messages
      })
    })
    .catch(logger.error)
})

module.exports = router
