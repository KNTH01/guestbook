'use strict'

let connection = require('../config/db')
const moment = require('moment')

class User {

  constructor (row) {
    this.row = row
  }

  get id () {
    return this.row.id
  }

  get username () {
    return this.row.username
  }

  get password () {
    return this.row.password
  }

  get createdAt () {
    return moment(this.row.created_at)
  }

  static register (userObj, cb) {
    connection.query(
      'INSERT INTO user SET username = ?, password = ?, created_at = ?',
      [userObj.username, userObj.password, new Date()],
      (err, result) => {
        if (err) {
          throw err
        }
        cb(result)
      }
    )
  }

  static login (userObj, cb) {
    this.findByUsername(userObj.username, (user) => {
      if (!user) {
        cb('No user found', user)
      } else if (user.password === userObj.password) {
        cb(null, user)
      } else {
        cb('bad credentials', user)
      }
    })
  }

  static findAll (cb) {
    connection.query('SELECT * FROM messages', (err, rows) => {
      if (err) {
        throw err
      }
      cb(rows.map((row) => new User(row)))
    })
  }

  static findBy (id, cb) {
    return this.find('id', id, cb)
  }

  static findByUsername (username, cb) {
    return this.find('username', username, cb)
  }

  static find (findBy, findValue, cb) {
    connection.query(`SELECT * FROM user WHERE ${findBy} = ?`, [findValue], (err, rows) => {
      if (err) {
        throw err
      }
      if (rows.length === 1) {
        cb(new User(rows[0]))
      } else {
        cb(new User(rows))
      }
    })
  }
}

module.exports = User
