const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const resolvers = require("./graphql/resolvers");

const typeDefs = require("./graphql/typeDefs");

require("dotenv").config();

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDb Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
