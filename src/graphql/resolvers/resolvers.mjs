import secrets from "../../../lib/secrets.js";
import { getDbClient } from "../../db/client.js";

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
    environment: process.env.NODE_ENV,
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    environment: process.env.NODE_ENV,
  },
];

let cacheResponse = null;

export const resolvers = {
  Query: {
    getDbUrl: async () => {
      if (cacheResponse) {
        return cacheResponse;
      }
      const dbUrl = await secrets.getDatabaseUrl();

      if (dbUrl) {
        const sql = await getDbClient();
        const dbUrlResult = await sql`select now()`;

        // return {
        //   message: "Hello from root!",
        //   dburl: dbUrl,
        //   neonResponse: dbUrlResult,
        // };

        cacheResponse = {
          message: "Hello from root!",
          dburl: dbUrl,
          neonResponse: dbUrlResult,
        };

        return cacheResponse;
      } else {
        throw new Error("DB url not available");
      }
    },
  },
};
