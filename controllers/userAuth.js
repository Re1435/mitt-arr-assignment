const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    // Validate the user input
    if (!username || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser !== null) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      phoneNumber,
    });

    // Save user
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user credentials
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Checking user exists
    const existUser = await User.findOne({ email });
    if (existUser === null) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isPwdMatched = await bcrypt.compare(password, existUser.password);
    if (!isPwdMatched) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: existUser._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    if (token) {
      return res.status(200).json({ token });
    } else {
      return res.status(400).json({ message: "Invalid user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { register, login };
