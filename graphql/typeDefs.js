const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    body: String!
    id: ID!
    username: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
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
    login(username: String!, password: String!): User!
    register(registerInput: RegisterInput): User!
    createPost(body: String!): Post!
    createComment(postId: ID!, body: String!): Post!
    deletePost(postID: ID!): String!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postID: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;