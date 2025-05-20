const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  const { policyName, comment, rating } = req.body;

  if (!policyName || !comment || !rating) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const review = new Review({
      user: req.user._id,
      policyName,
      comment,
      rating
    });
    await review.save();
    res.json({ message: "Review submitted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Error saving review." });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "email");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Error fetching reviews." });
  }
};
