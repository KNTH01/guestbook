const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

// my personal file with google auth info
const googleSecret = require('../secret/authSecret').google

module.exports = function () {
  passport.use(new GoogleStrategy({
    clientID: googleSecret.clientId, // GOOGLE_CLIENT_ID
    clientSecret: googleSecret.clientSecret, // GOOGLE_CLIENT_SECRET
    callbackURL: googleSecret.callbackURL // "http://localhost:3000/users/auth/google/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    console.log('auth google', accessToken, refreshToken, profile)
    const userProfile = {
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName
    }
    require('./authUser')(userProfile, done)
  }))
}
