// migrations/20251101062941_create_ideas_table.js
import pkg from 'knex';
const knex = pkg;

/** @param {Knex} knex */
export async function up(knex) {
  await knex.schema.createTable('ideas', (table) => {
    table.increments('id').primary();
    table.string('title', 100).notNullable();
    table.string('description', 500).notNullable();
    table.integer('vote_count').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

/** @param {Knex} knex */
export async function down(knex) {
  await knex.schema.dropTableIfExists('ideas');
}
