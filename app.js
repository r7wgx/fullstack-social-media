// liblary & framework
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// file
const typeDefs = require("./graphql/typedefs.js");
const resolvers = require("./graphql/resolvers.js");

// conf
dotenv.config();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
}).then(() => console.log('MongoDB Connected!'));


const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen({port: 5000}).then((res) => {
    console.log(`server is running at : ${res.url}`);
});