// migrations/20251101062941_create_users_table.js
import pkg from 'knex';
const knex = pkg;

/** @param {Knex} knex */
export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username', 255).notNullable();
    table.string('password', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

/** @param {Knex} knex */
export async function down(knex) {
  await knex.schema.dropTableIfExists('users');
}
