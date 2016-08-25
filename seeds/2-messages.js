const moment = require('moment')

exports.seed = function (knex, Promise) {
  const tableName = 'messages'

  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex(tableName).insert({
          id: 1,
          userId: 1,
          content: 'In enim justo rhoncus ut',
          createdAt: moment().format()
        }),

        knex(tableName).insert({
          id: 2,
          userId: 1,
          content: 'Pellentesque egestas neque sit amet',
          createdAt: moment().format()
        }),

        knex(tableName).insert({
          id: 3,
          userId: 2,
          content: 'Duis vel nibh at',
          createdAt: moment().format()
        })
      ])
    })
}
