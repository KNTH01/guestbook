const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/User')

// my personal file with google auth info
const googleSecret = require('../secret/googlesecret.json').web

module.exports = function () {
  passport.use(new GoogleStrategy({
    clientID: googleSecret.client_id, // GOOGLE_CLIENT_ID
    clientSecret: googleSecret.client_secret, // GOOGLE_CLIENT_SECRET
    callbackURL: googleSecret.redirect_uris[0] // "http://www.example.com/auth/google/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    let email = profile.emails[0].value
    User.query()
      .where('email', '=', email)
      .then(users => {
        let user = users[0]
        if (user) {
          done(null, users[0])
        } else {
          User.query()
            .insert({
              email,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              createdAt: new Date()
            })
            .then(newUser => {
              done(null, newUser)
            }).catch(done)
        }
      }).catch(done)
  }))
}
