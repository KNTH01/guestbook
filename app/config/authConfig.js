// unversioned secret files
const googleSecret = require('../../config_secret/authenticationProviders').google
const githubSecret = require('../../config_secret/authenticationProviders').github
const twitterSecret = require('../../config_secret/authenticationProviders').twitter

module.exports = {
  google: {
    clientID: googleSecret.clientID, // CLIENT ID
    clientSecret: googleSecret.clientSecret, // CLIENT SECRET
    callbackURL: googleSecret.callbackURL // http://localhost:3000/users/auth/google/callback
  },
  github: {
    clientID: githubSecret.clientID,
    clientSecret: githubSecret.clientSecret,
    callbackURL: githubSecret.callbackURL // http://localhost:3000/users/auth/github/callback
  },
  twitter: {
    consumerKey: twitterSecret.consumerKey,
    consumerSecret: twitterSecret.consumerSecret,
    callbackURL: twitterSecret.callbackURL
  }

}
