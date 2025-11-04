// migrations/20251104100000_create_idea_votes_table.js
import pkg from 'knex';
const knex = pkg;

/** @param {Knex} knex */
export async function up(knex) {
  await knex.schema.createTable('idea_votes', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('idea_id').unsigned().references('id').inTable('ideas').onDelete('CASCADE');
    table.integer('vote_type').notNullable().checkBetween([-1, 1]);
    table.unique(['user_id', 'idea_id']); // prevent multiple votes per idea per user
  });
}

/** @param {Knex} knex */
export async function down(knex) {
  await knex.schema.dropTableIfExists('idea_votes');
}
