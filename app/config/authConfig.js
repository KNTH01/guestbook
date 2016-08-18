// unversioned secret files
const googleSecret = require('../../secret/authSecret').google
const githubSecret = require('../../secret/authSecret').github
const twitterSecret = require('../../secret/authSecret').twitter

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
