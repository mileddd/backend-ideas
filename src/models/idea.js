import { Model } from 'objection';

class Idea extends Model {
  static get tableName() {
    return 'ideas';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'description'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 100 },
        description: { type: 'string', minLength: 1, maxLength: 500 },
        vote_count: { type: 'integer', default: 0 },
        created_at: { type: 'string', format: 'date-time' },
      },
    };
  }
}

export default Idea;
