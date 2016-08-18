const passport = require('passport')

const User = require('../models/User')
const logger = require('../logger')

passport.serializeUser((user, done) => {
  done(null, user.email)
})

passport.deserializeUser((email, done) => {
  User.query()
    .where('email', '=', email)
    .then(users => {
      done(null, users[0])
    })
    .catch(done)
})

passport.authMiddleware = () => {
  return function (req, res, next) {
    logger.debug('authMiddleware function, is the request authenticated? => %s', req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
}

let initPassport = () => {
  logger.debug('Init passport')
  require('./providers/local')()
  require('./providers/google')()
  require('./providers/github')()
  require('./providers/twitter')()
}

module.exports = initPassport
