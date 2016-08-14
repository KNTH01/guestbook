const passport = require('passport')
var GitHubStrategy = require('passport-github2').Strategy

// my personal file with github auth info
const githubSecret = require('../secret/authSecret').github

module.exports = function () {
  passport.use(new GitHubStrategy({
    clientID: githubSecret.clientId, // GITHUB_CLIENT_ID
    clientSecret: githubSecret.clientSecret, // GITHUB_CLIENT_SECRET
    callbackURL: githubSecret.callbackURL // "http://127.0.0.1:3000/auth/github/callback"
  }, function (accessToken, refreshToken, profile, done) {
    console.log('auth github', accessToken, refreshToken, profile)
    done('Do not support Github auth yet')
    // require('./authUser')(userProfile, done)
  }))
}
