const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    body: String!
    id: ID!
    username: String!
    createdAt: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postID: ID!): Post
  }
  type Mutation {
    createPost(body: String!): Post!
    deletePost(postID: ID!): String!
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;