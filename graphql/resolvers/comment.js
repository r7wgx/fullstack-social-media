const Post = require("../../model/Post.js");
const {AuthenticationError, UserInputError} = require("apollo-server");
const authCheck = require("../../util/check-auth.js");

module.exports = {
    Mutation: {
        createComment: async (_, {postId, body }, context) => {
            const { username } = authCheck(context);

            if(body.trim() === "") {
                throw new UserInputError("Empty Comment", {
                    errors: {
                        body: "comment body must not empty"
                    }
                })
            }

            const post = await Post.findById(postId);

            if(post) {
                post.comments.unshift({
                    body,
                    username, 
                    createAt: new Date().toISOString
                })
                await post.save();
                return post
            } else {
                throw new UserInputError("Post not Found")
            }
        },
        deleteComment: async (_, {postId, commentId}, context) => {
            const { username } = authCheck(context);
            const post = await Post.findById(postId); 
            

            if(post) {
                const commentIndex = post.comments.findIndex((c) => c.id === commentId);

                if(post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1);
                    await post.save()
                    return post
                } else {
                    throw new AuthenticationError("Action not allowed")
                }
            } else {
                throw new UserInputError("Post Not Found")
            }
        }
    }
}