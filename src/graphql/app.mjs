import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { typeDefs } from "./schema/schema.mjs";
import { resolvers } from "./resolvers/resolvers.mjs";
import UserService from "../service/user.js";

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

app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers["token"];
      try {
        const user = UserService.verifyUser(token);
        return { user };
      } catch (error) {
        console.error("unable_to_verify", error);
        return {};
      }
    },
  })
);

export default app;
