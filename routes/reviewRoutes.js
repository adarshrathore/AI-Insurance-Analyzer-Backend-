import express from 'express';
import jwt from 'jsonwebtoken';
import Review from '../models/Review.js';

const router = express.Router();

// Middleware to verify token
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Get all reviews
router.get('/reviews', async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});

// Post a review
router.post('/reviews', authMiddleware, async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const newReview = new Review({ userId: req.userId, comment, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post review' });
  }
});

export default router;
