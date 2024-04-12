const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { addBookmark } = require("../controllers/bookmarkController");

router.post("/add", authMiddleware, addBookmark);

module.exports = router;
