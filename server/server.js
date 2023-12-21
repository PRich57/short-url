require("dotenv").config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require("./utils/auth");
const { Url } = require('./models');
const cors = require('cors');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return authMiddleware({ req, res });
  },
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  
  app.use(
    '/graphql', 
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // Set up the redirect from shortened url to original url
  app.get('/:shortId', async (req, res) => {
    try {
      const { shortId } = req.params;
      const url = await Url.findOne({ shortId: shortId });
      if (url) {
        return res.redirect(url.originalUrl);
      } else {
        return res.status(404).send('URL not found');
      }
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  })
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port http://localhost:${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
