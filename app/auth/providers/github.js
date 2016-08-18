const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const logger = require('../../logger')

module.exports = function () {
  logger.debug('Init passport: Github provider')
  passport.use(new GitHubStrategy(require('../../config/authConfig').github,
    function (accessToken, refreshToken, profile, done) {
      logger.verbose('Authentication service: Github', {accessToken, refreshToken, profile})
      done('Github authentication is not supported yet')
      // require('../authUser')(userProfile, done)
    })
  )
}
