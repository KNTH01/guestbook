
const tableName = 'messages'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments()
    table.text('content')
    table.dateTime('createdAt')
    table.dateTime('updatedAt')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(tableName)
}
