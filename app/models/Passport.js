'use strict'

const Model = require('objection').Model

class Passport extends Model {
  static get tableName () {
    return 'passport'
  }
}

module.exports = Passport
