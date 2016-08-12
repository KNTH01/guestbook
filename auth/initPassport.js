const passport = require('passport')

const User = require('../models/User')

passport.serializeUser((user, done) => {
  done(null, user.email)
})

passport.deserializeUser((email, done) => {
  User.query()
    .where('email', '=', email)
    .then(users => {
      done(null, users[0])
    })
    .catch(done)
})

passport.authMiddleware = () => {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
}

let initPassport = () => {
  require('./local')()
  // require('./google')()
}

module.exports = initPassport
