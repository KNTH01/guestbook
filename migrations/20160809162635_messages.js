
const tableName = 'messages'
/*
foreigntable.foreign(columns)
Adds a foreign key constraint to a table for an existing column using table.foreign(column).references(column) or multiple columns using table.foreign(columns).references(columns). You can also chain onDelete and/or onUpdate to set the reference option (RESTRICT, CASCADE, SET NULL, NO ACTION) for the operation. Note, this is the same as column.references(column) but works for existing column
 */

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments()
    table.integer('userId').unsigned().index().references('id').inTable('users')
    table.text('content')
    table.dateTime('createdAt')
    table.dateTime('updatedAt')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(tableName)
}
