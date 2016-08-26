const tableName = 'passport'

exports.up = function (knex, Promise) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments()
    table.integer('userId').unsigned().index()
      .references('id').inTable('users').onDelete('CASCADE')
    table.string('profileId')
    table.string('provider')
    table.string('password')
    table.dateTime('createdAt')
    table.dateTime('updatedAt')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(tableName)
}
