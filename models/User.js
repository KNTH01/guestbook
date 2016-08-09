'use strict'

const Model = require('objection').Model

class User extends Model {
  static get tableName () {
    return 'users'
  }

  get fullName () {
    return `${this.firstName} ${this.lastName}`
  }
}

module.exports = User
