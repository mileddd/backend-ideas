import { Model } from 'objection';
import Idea from './idea.js';
import User from './user.js';

class IdeaVote extends Model {
  static get tableName() {
    return 'idea_votes';
  }

  static get relationMappings() {
    return {
      idea: {
        relation: Model.BelongsToOneRelation,
        modelClass: Idea,
        join: {
          from: 'idea_votes.idea_id',
          to: 'ideas.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'idea_votes.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

export default IdeaVote;
