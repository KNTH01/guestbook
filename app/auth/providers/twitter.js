const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const logger = require('../../logger')

module.exports = function () {
  logger.debug('Init passport: Twitter provider')
  passport.use(new TwitterStrategy(require('../../config/authConfig').twitter,
  function (token, tokenSecret, profile, done) {
    logger.verbose('Authentication service: Twitter', {token, tokenSecret, profile})
    done('Twitter authentication is not supported yet')
    // require('../authUser')(userProfile, done)
  }))
}
