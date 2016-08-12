const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

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

let initPassport = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, (email, password, done) => {
    User.login(email, password)
      .then(result => {
        done(null, result.user, { message: result.message })
      })
      .catch(err => {
        done(err)
      })
  }
))

  passport.authMiddleware = () => {
    return function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      }
      res.redirect('/')
    }
  }
}

module.exports = initPassport
