// liblary & framework
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const conn = require('./db.js'); // database connection

// file
const typeDefs = require("./graphql/typeDefs.js");
const resolvers = require("./graphql/resolvers/index.js");

// conf
dotenv.config();

conn();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

server.listen({port: 5000}).then((res) => {
    console.log(`server is running at : ${res.url}`);
});