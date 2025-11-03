import Idea from '../models/idea.js';
import db from '../config/db.js'; 

export const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.query().orderBy('vote_count', 'desc');
    res.json(ideas);
  } catch (err) {
    console.error('Get ideas error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createIdea = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const idea = await Idea.query().insert({
      title,
      description,
      vote_count: 0,
    })
    .returning(['id', 'title', 'description', 'vote_count', 'created_at']);
    res.status(201).json(idea);
  } catch (err) {
    console.error('Create idea error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const upvoteIdea = async (req, res) => {
  const { id } = req.params;

  try {
    const idea = await Idea.query()
      .findById(id)
      .patch({ vote_count: Idea.raw('?? + 1', ['vote_count']) })
      .returning('*');

    if (!idea) return res.status(404).json({ error: 'Idea not found' });

    const updated = await Idea.query().findById(id);
    res.json(updated);
  } catch (err) {
    console.error('Upvote error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const downvoteIdea = async (req, res) => {
  const { id } = req.params;

  try {
    const idea = await Idea.query()
      .findById(id)
      .patch({ vote_count: Idea.raw('?? - 1', ['vote_count']) })
      .returning('*');

    if (!idea) return res.status(404).json({ error: 'Idea not found' });

    const updated = await Idea.query().findById(id);
    res.json(updated);
  } catch (err) {
    console.error('Downvote error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
