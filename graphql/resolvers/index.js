const postsResolvers = require('./posts.js');
const usersResolvers = require('./users.js');
const commentResolvers = require("./comment.js");
module.exports = {
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentResolvers.Mutation
  }
};