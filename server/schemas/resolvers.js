// URL regex pattern source: https://www.freecodecamp.org/news/how-to-write-a-regular-expression-for-a-url/

const jwt = require('jsonwebtoken');
const { User, Url } = require('../models');
const ShortUniqueId = require('short-unique-id');

// Pull in the jwt secret environment variables
const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    // Get all shortened URLs for specific user
    getUserUrls: async (_, { userId }) => {
      // Sort newest to oldest
      const urls = await Url.find({ user: userId })
      .sort({ createdAt: -1 });
      return urls.map(url => {
        return {
          ...url._doc,
          fullShortUrl: `https://www.you-rl.xyz/${url.shortId}`
        };
      });
    },
    // Get single user's data based on their userId
    getUserData: async (_, { userId }) => {
      return await User.findById(userId);
    }
  },
  Mutation: {
    // User registration logic
    register: async (_, { username, email, password }) => {
      try {
        // Check if the user already exists in db
        const existingEmail = await User.findOne({ email: email });

        if (existingEmail) {
          // If the user exists, send error message
          throw new Error('This email address is already in use');
        }
        
        // Check if username already exists in db
        const existingUsername = await User.findOne({ username: username });

        if (existingUsername) {
          // If the username is already in use, send error message
          throw new Error("This username is taken");
        }

        // Create new user with their input
        const newUser = new User({
          username,
          email,
          password,
        });

        // Save user
        const savedUser = await newUser.save();

        // Create a json web token with a 24 hour time limit
        const token = jwt.sign({ email: savedUser.email, id: savedUser._id }, JWT_SECRET, { expiresIn: '24h' });

        // Return the schema based properties of the user and the token
        return { ...savedUser._doc, token };
      } catch (err) {
        if (err.name === 'ValidationError') {
          // Extract mongoose validation errors from user model
          let errors = Object.values(err.errors).map(el => el.message);
          let errorMessage = errors.join(' ');

          // Throw error message from validation
          throw new Error(errorMessage);
        } else {
          // Other errors
          throw new Error(err.message);
        }
      }
    },
    // User login logic
    login: async (_, { identifier, password }) => {
      try {
        // Make identifier lowercase for case insensitive search
        const identifierLowerCase = identifier.toLowerCase();

        // Find user by their email or username with regex for case insensitivity
        const user = await User.findOne({ 
          $or: [
            { email: new RegExp(`^${identifierLowerCase}$`, 'i') },
            { username: new RegExp(`^${identifierLowerCase}$`, `i`) }
          ]
        });

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

        // Create new token for the user with 24 hour time limit
        const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: '24h' });
        return { ...user._doc, token };
      } catch (err) {
        throw new Error(err.message);
      }
    },
    // Logic to create a short URL
    shortenUrl: async (_, { originalUrl, userId, customSlug }) => {
      // Check for originalUrl
      if (!originalUrl) {
        throw new Error("Original URL is required")
      }

      // Validate original url format to be sure it is a url
      // Credit for the source of this regex is at the top of this file
      const pattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

      if (!pattern.test(originalUrl)) {
        throw new Error("Original URL doesn't appear to be in valid URL format.")
      }

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
        const fullShortUrl = `https://www.you-rl.xyz/${shortId}`
        // Save the new URL to the database and return it
        const url = new Url({ originalUrl, shortId, user: userId });
        await url.save();
        return { ...url._doc, fullShortUrl };
      } catch (err) {
        throw new Error(err.message)
      }
    },
    // Logic to delete a specific URL
    deleteUrl: async (_, { urlId }, context) => {
      try {
        // Get user from context
        const loggedInUserId = await context.user.id;

        // Find URL by its ID
        const url = await Url.findById(urlId);
        if (!url) {
          throw new Error('URL not found');
        }

        // Check that this URL belongs to the logged in user
        if (url.user.toString() !== loggedInUserId) {
          throw new Error('Not authorized to delete this URL');
        }

        // Delete the URL
        await Url.findByIdAndDelete(urlId);
        return { success: true, message: 'URL deleted successfully' };
      } catch (err) {
        throw new Error(err.message);
      }
    },
    // Logic to delete a user account and associated URLs
    deleteUser: async (_, { userId }, context) => {
      try {
        // Get the user info from context
        const loggedInUserId = context.user.id;

        // Make sure the request matches the logged-in user's ID
        if (userId !== loggedInUserId) {
          throw new Error('Not authorized to delete this user');
        }

        // Delete all URLs associated with this user
        await Url.deleteMany({ user: userId });

        // Delete user
        await User.findByIdAndDelete(userId);

        return { success: true, message: 'User and all associated URLs deleted' };
      } catch (err) {
        throw new Error(err.message);
      }
    },
    // Update the user's preference to permanently dismiss the delete URL dialog
    setDismissDeleteUrlDialog: async (_, { userId, dismiss }) => {
      // Update user's preference in their document
      return await User.findByIdAndUpdate(userId, { dismissDeleteUrlDialog: dismiss }, { new: true });
    },
  },
};

module.exports = resolvers;