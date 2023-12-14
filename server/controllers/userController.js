const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models');

const JWT_SECRET = process.env.JWT_SECRET;

// Register user
exports.register = async (req, res) => {
  // Collect user input
  const { username, email, password } = req.body;
  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If the user exists, return status code and message
      return res.status(409).json({ message: 'Email already in use' });
    }
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create the user with their input and the hashed password
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });
    // Create a json web token with a 2 hour time limit
    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: '2h' });
    res.status(201).json({ result: user, token });
  } catch (err) {
    res.status(500).json({ message: "Unknown error occurred" });
  }
};

// Login logic
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by their email
    const user = await User.findOne({ email });
    // If they can't be found by the provided email, return 404 and message
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    // Verify the user entered the correct password
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    // If incorrect, return error status code and message
    if (!isCorrectPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    // Create a new token for the user with a 2h time limit
    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ result: user, token });
  } catch (err) {
    res.status(500).json({ message: "Unknown error occurred" });
  }
};