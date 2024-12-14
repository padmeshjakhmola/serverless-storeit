import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { typeDefs } from "./schema/schema.mjs";
import { resolvers } from "./resolvers/resolvers.mjs";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use("/graphql", cors(), express.json(), expressMiddleware(server));

export default server;
