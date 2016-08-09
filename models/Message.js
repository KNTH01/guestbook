'use strict'

const Model = require('objection').Model

class Message extends Model {
  static get tableName () {
    return 'messages'
  }
}

module.exports = Message
