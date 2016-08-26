'use strict'

const Model = require('objection').Model
const Passport = require('./Passport')

class User extends Model {
  static get tableName () {
    return 'users'
  }

  get fullName () {
    return `${this.firstName} ${this.lastName}`
  }

  get password () {
    console.log(this.passports)
    if (this.passports !== undefined) {
      this.passports.forEach(passport => {
        if (passport.provider === 'local') {
          return passport.password
        }
      })
    }
    return null
  }

  set password (password) {
    this.passports.forEach(passport => {
      if (passport.provider === 'local') {
        passport.password = password
        return true
      }
    })
    return false
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

  // This object defines the relations to other models.
  static get relationMappings () {
    return {
      passports: {
        relation: Model.HasManyRelation,
        modelClass: Passport,
        join: {
          from: 'users.id',
          to: 'passport.userId'
        }
      }
    }
  }
}

module.exports = User
