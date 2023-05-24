const Post = require('../../model/Post.js');
const { AuthenticationError } = require('apollo-server');
const checkAuth = require("../../util/check-auth.js");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, {postID}) {
      try {
          const post = await Post.findById(postID)
          if(post) {
            return post
          } else {
            throw new Error("Post is not found");
          }
      } catch(err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async createPost(_, {body}, context) {
      const user = checkAuth(context);
      console.log(user);

        const newPost = new Post({
          body,
          user: user.id,
          username: user.username,
          createdAt: new Date().toISOString()
        });

        const post = await newPost.save();

        return post;
    },
    async deletePost(_, {postID}, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postID)

        if(user.username === post.username) {
          await post.delete();
          return "post deleted successfully"
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch(err) {
        throw new Error(err)
      }
    }
  }
};