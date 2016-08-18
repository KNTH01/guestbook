const User = require('../models/User')

module.exports = function (userProfile, done) {
  User.query()
    .where('email', '=', userProfile.email)
    .then(users => {
      let user = users[0]
      if (user) {
        done(null, users[0])
      } else {
        User.query()
          .insert({
            email: userProfile.email,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            createdAt: new Date()
          })
          .then(newUser => {
            done(null, newUser)
          }).catch(done)
      }
    }).catch(done)
}
