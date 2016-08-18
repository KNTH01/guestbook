'use strict'

const Model = require('objection').Model
const User = require('./User')

class Message extends Model {
  static get tableName () {
    return 'messages'
  }

  // This object defines the relations to other models.
  static get relationMappings () {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          to: 'messages.userId'
        }
      }
    }
  }
}

module.exports = Message
