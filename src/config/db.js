import pkg from 'knex';
import { Model } from 'objection';
import knexConfig from '../../knexfile.js';

// Extract knex from default import
const { knex } = pkg;

// Initialize knex
const db = knex(knexConfig.development);

// Bind Objection Model to the knex instance
Model.knex(db);

export default db;
