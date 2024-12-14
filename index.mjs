import app from "./src/graphql/app.mjs";
import serverlessExpress from "@codegenie/serverless-express";

export const graphqlHandler = serverlessExpress({ app });
