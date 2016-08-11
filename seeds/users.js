const moment = require('moment')

exports.seed = function (knex, Promise) {
  const tableName = 'users'

  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex(tableName).insert({
          id: 1,
          email: 'admin@example.com',
          firstName: 'John',
          lastName: 'Doe',
          createdAt: moment().format()
        }),

        knex(tableName).insert({
          id: 2,
          email: 'patty@gmail.com',
          firstName: 'Pat',
          lastName: 'Trouille',
          createdAt: moment().format()
        }),

        knex(tableName).insert({
          id: 3,
          email: 'will.smith@squad.fr',
          firstName: 'Will',
          lastName: 'Smith',
          createdAt: moment().format()
        })
      ])
    })
}
