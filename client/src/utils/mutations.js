import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      _id
      email
      token
      username
    }
  }
`;

export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      email
      token
      username
    }
  }
`;

export const SHORTEN_URL = gql`
  mutation Mutation($originalUrl: String!, $userId: ID!, $customSlug: String) {
    shortenUrl(originalUrl: $originalUrl, userId: $userId, customSlug: $customSlug) {
      _id
      createdAt
      originalUrl
      shortId
      user
      fullShortUrl
    }
  }
`;