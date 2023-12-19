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
    fullShortUrl: String
    createdAt: String
    user: ID
  }
  
  type DeleteResponse {
    success: Boolean!
    message: String!
  }

  type Query {
    getUserUrls(userId: ID!): [Url]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    shortenUrl(originalUrl: String!, userId: ID!, customSlug: String): Url
    deleteUrl(urlId: ID!): DeleteResponse
    deleteUser(userId: ID!): DeleteResponse
  }
`;

module.exports = typeDefs;