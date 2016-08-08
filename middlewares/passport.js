var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
  (username, password, done) => {
    let User = require('./models/user')

    User.findByUsername(username, (user) => {
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        })
      }
      // if (!user.validPassword(password)) {
      //   return done(null, false, {
      //     message: 'Incorrect password.'
      //   })
      // }
      return done(null, user)
    })
  }
))
