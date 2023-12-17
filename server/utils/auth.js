const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const expiration = '2h';
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  authMiddleware: function ({ req }) {
    let token = req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, JWT_SECRET, { maxAge: expiration });
      req.user = data;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.log('Token expired');
        res.status(401).send({ message: 'Token expired. Please login again.' });
      } else {
        console.log('Invalid token');
      }
    }

    return req;
  },
};