const mongoose = require("mongoose");
const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipeId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
