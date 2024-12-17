import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { typeDefs } from "./schema/schema.mjs";
import { resolvers } from "./resolvers/resolvers.mjs";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();
const app = express();

// For health check
app.use("/health", (req, res) => {
  return res.status(200).json({ message: "Server is working 💪🏻" });
});

app.use("/graphql", cors(), express.json(), expressMiddleware(server));

export default app;
