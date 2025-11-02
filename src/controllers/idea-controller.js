import pkg from 'knex';
import knexConfig from '../../knexfile.js';
const knex = pkg.default;
const db = knex(knexConfig.development);

export const getIdeas = async (req, res) => {
  try {
    const ideas = await db('ideas').select('*').orderBy('vote_count', 'desc');
    res.json(ideas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createIdea = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const [idea] = await db('ideas')
      .insert({ title, description })
      .returning(['id', 'title', 'description', 'vote_count', 'created_at']);
    res.status(201).json(idea);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const upvoteIdea = async (req, res) => {
  const { id } = req.params;

  try {
    const [idea] = await db('ideas')
      .where({ id })
      .increment('vote_count', 1)
      .returning(['id', 'title', 'description', 'vote_count', 'created_at']);

    if (!idea) return res.status(404).json({ error: 'Idea not found' });

    res.json(idea);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const downvoteIdea = async (req, res) => {
  const { id } = req.params;

  try {
    const [idea] = await db('ideas')
      .where({ id })
      .decrement('vote_count', 1)
      .returning(['id', 'title', 'description', 'vote_count', 'created_at']);

    if (!idea) return res.status(404).json({ error: 'Idea not found' });

    res.json(idea);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
