const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/User')
const logger = require('../../logger')

module.exports = function () {
  logger.debug('Init passport: local provider')
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, (email, password, done) => {
    User.login(email, password)
      .then(result => {
        done(null, result.user, {
          message: result.message
        })
      })
      .catch(err => {
        logger.error('User.login() fails', err)
        done(err)
      })
  }))
}
