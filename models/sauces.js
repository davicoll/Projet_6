const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String },
  imageUrl: { type: String },
  userId: { type: String, required: true },
  heat: { type: Number, min: 1, max: 10 },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: ["String <userId>"],
  usersDisliked: ["String <userId>"],
});

module.exports = mongoose.model("Sauce", sauceSchema);
