import Idea from '../models/idea.js';
import db from '../config/db.js'; 
import IdeaVote from '../models/idea-vote.js';
import { raw } from 'objection';

export const getIdeas = async (req, res) => {
  const userId = req.user?.id; // from JWT middleware

  try {
    // 1. Get all ideas
    const ideas = await Idea.query().orderBy('vote_count', 'desc');

    if (!userId) {
      // If not logged in, just return ideas normally
      return res.json(ideas.map(i => ({ ...i, userVote: 0 })));
    }

    // 2. Get all votes by this user
    const userVotes = await IdeaVote.query()
      .where('user_id', userId)
      .select('idea_id', 'vote_type');

    // 3. Convert to a lookup object
    const votesMap = Object.fromEntries(userVotes.map(v => [v.idea_id, v.vote_type]));

    // 4. Attach userVote to each idea
    const result = ideas.map(i => ({
      ...i,
      userVote: votesMap[i.id] || 0
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching ideas:', err);
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

async function handleVote(ideaId, userId, voteValue) {
  const existingVote = await IdeaVote.query().findOne({ idea_id: ideaId, user_id: userId });

  if (!existingVote) {
    // First vote
    await IdeaVote.query().insert({ idea_id: ideaId, user_id: userId, vote_type: voteValue });
    await Idea.query().findById(ideaId).patch({
      vote_count: raw('?? + ?', ['vote_count', voteValue]),
    });
  } else if (existingVote.vote_type === voteValue) {
    // Click same vote again → remove it
    await IdeaVote.query().delete().where({ idea_id: ideaId, user_id: userId });
    await Idea.query().findById(ideaId).patch({
      vote_count: raw('?? - ?', ['vote_count', voteValue]),
    });
  } else {
    // Switching vote type (up ↔ down)
    await IdeaVote.query().patch({ vote_type: voteValue }).where({ idea_id: ideaId, user_id: userId });
    await Idea.query().findById(ideaId).patch({
      vote_count: raw('?? + ?', ['vote_count', voteValue * 2]), // adjust by 2
    });
  }

  const updated = await Idea.query().findById(ideaId);
  return updated;
}

export const upvoteIdea = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const updated = await handleVote(id, userId, 1);
    res.json(updated);
  } catch (err) {
    console.error('Upvote error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const downvoteIdea = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const updated = await handleVote(id, userId, -1);
    res.json(updated);
  } catch (err) {
    console.error('Downvote error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};