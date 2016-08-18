const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

module.exports = function () {
  passport.use(new TwitterStrategy(require('../../config/authConfig').twitter,
  function (token, tokenSecret, profile, done) {
    console.log('auth google', token, tokenSecret, profile)
    done('Twitter authentication is not supported yet')
    // require('../authUser')(userProfile, done)
  }))
}
