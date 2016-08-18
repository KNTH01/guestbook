const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

module.exports = function () {
  passport.use(new GoogleStrategy(require('../../config/authConfig').google,
  function (accessToken, refreshToken, profile, done) {
    console.log('auth google', accessToken, refreshToken, profile)
    const userProfile = {
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName
    }
    require('../authUser')(userProfile, done)
  }))
}
