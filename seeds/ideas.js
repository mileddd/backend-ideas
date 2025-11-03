export async function seed(knex) {
  // Optional: delete existing ideas
  await knex('ideas').del();

  // Insert sample ideas
  await knex('ideas').insert([
    {
      title: 'Implement dark mode',
      description: 'Add a toggle to switch between light and dark themes.',
      vote_count: 5,
    },
    {
      title: 'Add search functionality',
      description: 'Enable users to search through ideas easily.',
      vote_count: 3,
    },
    {
      title: 'Improve performance',
      description: 'Optimize queries and frontend rendering for faster load times.',
      vote_count: 7,
    },
  ]);
}
