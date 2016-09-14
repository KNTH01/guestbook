'use strict'

const Model = require('objection').Model

class User extends Model {
  static get tableName () {
    return 'users'
  }

  get fullName () {
    return `${this.firstName} ${this.lastName}`
  }

  static login (email, password) {
    return new Promise((resolve, reject) => {
      User.query()
        .where('email', '=', email)
        .then(user => {
          user = user[0]
          if (!user) {
            resolve({
              user: false,
              message: 'Email not found'
            })
          }
          if (user.password === password) {
            resolve({
              user,
              message: 'You are loggued in'
            })
          } else {
            resolve({
              user: false,
              message: 'Bad credentials'
            })
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

module.exports = User
