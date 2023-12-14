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
        // Create new user with their input
        const newUser = new User({
          username,
          email,
          password,
        });
        // Save user
        const savedUser = await newUser.save();

        // Create a json web token with a 2 hour time limit
        const token = jwt.sign({ email: savedUser.email, id: savedUser._id }, JWT_SECRET, { expiresIn: '2h' });
        // Return the schema based properties of the user and the token
        return { ...savedUser._doc, token };
      } catch (err) {
        throw new Error(err.message);
      }
    },
    // User login
    login: async (_, { email, password }) => {
      try {
        // Find user by their email
        const user = await User.findOne({ email });
        // If not found, throw new Error
        if (!user) {
          throw new Error("User not found");
        }
        // Verify the user entered the correct password
        const validPassword = await user.isCorrectPassword(password)

        // // If incorrect, throw new error
        if (!validPassword) {
          throw new Error("Incorrect password");
        }
        // Create new token for the user with 2 hour time limit
        const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: '2h' });
        return { ...user._doc, token };
      } catch (err) {
        throw new Error(err.message);
      }
    },
    // Shorten URL
    shortenUrl: async (_, { originalUrl, userId, customSlug }) => {
      try {
        if (customSlug) {
          // Check if the customSlug is url-safe with regex
          if (/[^A-Za-z0-9_-]/.test(customSlug)) {
            throw new Error("Custom slug must only contain alphanumeric characters, hyphens, and/or underscores");
          }
          // Check if customSlug already exists
          const existingUrl = await Url.findOne({ shortId: customSlug });
          if (existingUrl) {
            throw new Error('Custom URL already in use');
          }
        }
        // Use custom slug if provided, otherwise randomly generate
        const shortId = customSlug || uid.rnd();
        // Save the new URL to the database and return it
        const url = new Url({ originalUrl, shortId, user: userId });
        await url.save();
        return url;
      } catch (err) {
        throw new Error(err.message)
      }
    },
  },
};

module.exports = resolvers;