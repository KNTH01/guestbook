const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = function () {
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
        done(err)
      })
  }))
}
