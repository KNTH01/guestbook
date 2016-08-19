process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')
const should = chai.should()
const assert = chai.assert

const User = require('../../app/models/User')
const userRoute = '/users'

chai.use(chaiHttp)

describe('User', () => {
  beforeEach(done => {
    User.query()
      .delete()
      .then(numDeleted => {
        done()
      })
      .catch(err => {
        done(err.stack)
      })
  })

  describe('register', () => {
    it('it should register a new user using local provider', done => {
      const johnSnow = {
        email: 'john@snow.fr',
        password: 'blah',
        password2: 'blah',
        firstName: 'John',
        lastName: 'Snow'
      }

      chai.request(server)
        .post(`${userRoute}/register`)
        .send(johnSnow)
        .end((err, res) => {
          assert.equal(err, null)
          res.should.have.status(200)

          // fetch new User by email
          User.query()
            .where('email', '=', johnSnow.email)
            .then(users => {
              let dbJohnSnow = users[0]

              assert.equal(johnSnow.email, dbJohnSnow.email)
              assert.equal(johnSnow.firstName, dbJohnSnow.firstName)
              assert.equal(johnSnow.lastName, dbJohnSnow.lastName)
              assert.equal(johnSnow.password, dbJohnSnow.password)
              done()
            })
        })
    })
  })
})
