'use strict'

const express = require('express')
const router = express.Router()

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

module.exports = router
