const typeDefs = `
  type User {
    _id: ID!
    username: String
    email: String
    token: String
  }

  type Url {
    _id: ID!
    originalUrl: String
    shortId: String
    createdAt: String
    user: ID
  }

  type Query {
    getUserUrls(userId: ID!): [Url]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    shortenUrl(originalUrl: String!, userId: ID!, customSlug: String): Url
  }
`;

module.exports = typeDefs;