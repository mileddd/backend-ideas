import bcrypt from 'bcrypt';

export async function seed(knex) {
  // Delete existing admin if exists
  await knex('users').where({ username: 'admin' }).del();

  // hash the sha256 password to bcrypt
  const hashedPassword = await bcrypt.hash('8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 10);

  // Insert admin
  await knex('users').insert({
    username: 'admin',
    password: hashedPassword,
  });
}
