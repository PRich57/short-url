const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const expiration = '24h';
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  authMiddleware: function ({ req, res }) {
    // Initialize an empty user object
    let authContext = {
      user: null,
    };

    // Extract the token from the headers
    let token = req.headers.authorization;
    
    if (token) {
      // Remove "Bearer" if it's present
      token = token.split(' ').pop().trim();
    }
    // console.log(token);

    // If a token doesn't exist, return the request obj as is
    if (!token) {
      return authContext;
    }

    try {
      // Verify the token and extract user data
      const decoded = jwt.verify(token, JWT_SECRET, { maxAge: expiration });
      // console.log(decoded);
      authContext.user = decoded;
    } catch (err) {
      // If the token has expired, send error code
      if (err instanceof jwt.TokenExpiredError) {
        console.log('Token expired');
        res.status(401).send({ message: 'Token expired. Please login again.' });
        return authContext;
      } else {
        // If token is invalid, log the error and continue
        console.log('Invalid token');
      }
    }

    return authContext;
  },
};