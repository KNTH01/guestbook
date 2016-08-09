exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments()
    table.string('email').unique()
    table.string('password')
    table.string('first_name')
    table.string('last_name')
    table.dateTime('created_at').defaultTo(knex.raw('now()'))
    table.dateTime('updated_at').defaultTo(knex.raw('now()'))
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
