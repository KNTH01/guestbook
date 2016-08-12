const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/User')

// my personal file with google auth info
const googleSecret = require('../googlesecret.json').web

module.exports = function () {
  passport.use(new GoogleStrategy({
    clientID: googleSecret.client_id, // GOOGLE_CLIENT_ID
    clientSecret: googleSecret.client_secret, // GOOGLE_CLIENT_SECRET
    callbackURL: googleSecret.redirect_uris[0] // "http://www.example.com/auth/google/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(profile)
    done()
    // console.log(profile)
      // User.findOrCreate({
      //   googleId: profile.id
      // }, function (err, user) {
      //   return done(err, user)
      // })
  }))
}
