import { gql } from "@apollo/client";

export const GET_USER_URLS = gql`
  query Query($userId: ID!) {
    getUserUrls(userId: $userId) {
      _id
      createdAt
      fullShortUrl
      originalUrl
      shortId
      user
    }
  }
`;

export const GET_USER_DATA = gql`
  query Query($userId: ID!) {
    getUserData(userId: $userId) {
      _id
      dismissDeleteUrlDialog
      email
      token
      username
    }
  }
`;