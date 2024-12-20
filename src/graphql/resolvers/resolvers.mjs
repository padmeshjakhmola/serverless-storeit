import secrets from "../../../lib/secrets.js";
import { getDbClient } from "../../db/client.js";
import crud from "../../db/crud.js";

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
    getUsers: async () => {
      const all_users = await crud.getUser();
      return all_users;
    },
  },
  Mutation: {
    addUser: async (_, { name, email }) => {
      try {
        const newUser = await crud.addUser(name, email);
        return newUser;
      } catch (error) {
        console.error("error_adding_user", error);
      }
    },

    checkUser: async (_, { email }) => {
      try {
        const user = await crud.checkUser(email);
        return !!user;
      } catch (error) {
        console.error("error_fetching_user", error);
        throw error;
      }
    },
  },
};
