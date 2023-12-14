const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Url } = require('../models');
const ShortUniqueId = require('short-unique-id');

// Instantiate as per npm docs
const uid = new ShortUniqueId({ length: 10 });
const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    // Get all shortened URLs for this user
    getUserUrls: async (_, { userId }) => {
      return Url.find({ user: userId })
    }
  },
  Mutation: {
    // User registration
    register: async (_, { username, email, password }) => {
      try {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          // If the user exists, throw new Error
          throw new Error('User already exists');
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
        return { token, user };
      } catch (err) {
        throw new Error("Failed to register user");
      }
    },
    // User login
    login: async (_, { email, password }) => {
      try {

      } catch (err) {
        throw new Error("Failed to log in")
      }
    },
    // Shorten URL
    shortenUrl: async (_, { originalUrl, userId, customSlug }) => {

    },
  },
};

module.exports = resolvers;