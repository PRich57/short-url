const jwt = require('jsonwebtoken');
const { User, Url } = require('../models');
const ShortUniqueId = require('short-unique-id');

// Pull in the jwt secret
const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    // Get all shortened URLs for this user
    getUserUrls: async (_, { userId }) => {
      const urls = await Url.find({ user: userId })
      .sort({ createdAt: -1 });
      return urls.map(url => {
        return {
          ...url._doc,
          fullShortUrl: `http://localhost:3001/${url.shortId}`
        };
      });
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
      // Create a random number function for values 1-10
      function getRandomNumber() {
        return Math.floor(Math.random() * 8) + 1;
      }

      // Instantiate as per npm docs with random length 1-10
      const uid = new ShortUniqueId({ length: getRandomNumber() });

      try {
        if (!originalUrl) {
          throw new Error("Original URL is required!");
        }

        let shortId;

        // If user provides custom slug
        if (customSlug) {
          // Check if the customSlug is url-safe with regex
          if (/[^A-Za-z0-9_-]/.test(customSlug)) {
            throw new Error("Custom URL must only contain alphanumeric characters, hyphens, and/or underscores");
          }
          // Check if customSlug already exists
          const existingUrl = await Url.findOne({ shortId: customSlug });
          if (existingUrl) {
            throw new Error('Custom URL already in use');
          } 
          // Assign value of customSlug to shortId
          shortId = customSlug;
        } else {
          // If no customSlug is provided, generate random shortId
          let isUnique = false;
          // Need to also make sure random id doesn't exist and regenerate if it does
          while (!isUnique) {
            shortId = uid.rnd();
            const existingUrl = await Url.findOne({ shortId });
            if (!existingUrl) {
              // Exit loop when I know it doesn't exist in database
              isUnique = true;
            }
          }
        }

        // Combine shortId with base domain
        const fullShortUrl = `http://localhost:3001/${shortId}`
        // Save the new URL to the database and return it
        const url = new Url({ originalUrl, shortId, user: userId });
        await url.save();
        return { ...url._doc, fullShortUrl };
      } catch (err) {
        throw new Error(err.message)
      }
    },
  },
};

module.exports = resolvers;