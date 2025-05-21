import express from 'express';
import jwt from 'jsonwebtoken';
import Review from '../models/Review.js';
import User from '../models/User.js';

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { policyName, comment, rating } = req.body;

    if (!policyName || !comment || !rating) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const newReview = new Review({
      userId: req.userId,
      username: user.username,
      policyName,
      comment,
      rating,
      createdAt: new Date(),
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to post review' });
  }
});

export default router;
