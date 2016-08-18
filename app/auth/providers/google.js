const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const logger = require('../../logger')

module.exports = function () {
  passport.use(new GoogleStrategy(require('../../config/authConfig').google,
  function (accessToken, refreshToken, profile, done) {
    logger.verbose('Authentication service: Google', {accessToken, refreshToken, profile})
    const userProfile = {
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName
    }
    require('../authUser')(userProfile, done)
  }))
}
