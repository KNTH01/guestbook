'use strict'

const dbConf = require('../config_secret/db')
const charset = 'utf8'

let development = dbConf.development
let production = dbConf.production
let test = dbConf.test

development.charset = charset
production.charset = charset
test.charset = charset

module.exports = {
  development,
  production,
  test
}

/*
  Example of development config :
  let development =  {
     host: 'localhost',
     user: 'root',
     password: 'root',
     database: 'goldenbook'
   }
 */
