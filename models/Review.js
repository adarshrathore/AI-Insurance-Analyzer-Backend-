import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  policyName: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }, // Auto set on creation
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
