const Bookmark = require("../models/Bookmark");
const User = require("../models/User");

const addBookmark = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.user.userId;

    const existingBookmark = await Bookmark.findOne({ user: userId, recipeId });
    if (existingBookmark) {
      return res
        .status(400)
        .json({ message: "Bookmark already exists for this recipe" });
    }

    // Create new bookmark
    const bookmark = new Bookmark({
      user: userId,
      recipeId,
    });

    // Save bookmark
    await bookmark.save();

    // Add bookmark to user's bookmarks array
    const user = await User.findById(userId);
    user.bookmarks.push(bookmark._id);
    await user.save();

    res.status(201).json({ message: "Bookmark added successfully" });
  } catch (error) {
    console.log("Error adding bookmark", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addBookmark };
