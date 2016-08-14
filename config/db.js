'use strict'

const dbConf = require('../secret/dbConf')

let {
  host,
  user,
  password,
  database
} = dbConf

module.exports = {
  host, // mysql host
  user, // mysql user
  password, // mysql password
  database, // mysql database
  charset: 'utf8' // knex charset init
}
