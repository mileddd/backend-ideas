import express from 'express';
import {
  getIdeas,
  createIdea,
  upvoteIdea,
  downvoteIdea,
} from '../controllers/idea-controller.js';

const router = express.Router();

router.get('/ideas', getIdeas);
router.post('/ideas', createIdea);
router.post('/ideas/:id/upvote', upvoteIdea);
router.post('/ideas/:id/downvote', downvoteIdea);

export default router;
