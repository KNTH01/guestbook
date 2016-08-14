const passport = require('passport')
var GitHubStrategy = require('passport-github2').Strategy

module.exports = function () {
  passport.use(new GitHubStrategy(require('../../config/authConfig').github,
    function (accessToken, refreshToken, profile, done) {
      console.log('auth github', accessToken, refreshToken, profile)
      done('Github authentication is not supported yet')
      // require('../authUser')(userProfile, done)
    })
  )
}
