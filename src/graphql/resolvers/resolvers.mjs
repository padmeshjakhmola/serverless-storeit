import jwt from "jsonwebtoken";
import secrets from "../../../lib/secrets.js";
import { getDbClient } from "../../db/client.js";
import crud from "../../db/crud.js";
import bcrypt from "bcryptjs";

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
    getUsers: async (_, __, context) => {
      if (context && context.user) {
        const all_users = await crud.getUser();
        return all_users;
      }
      throw new Error("User not authenticated to perform this action");
    },
  },
  Mutation: {
    addUser: async (_, { name, email, password }) => {
      try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await crud.addUser(name, email, hashPassword);

        return newUser;
      } catch (error) {
        console.error("error_adding_user", error);
        throw new Error("Unable to add user");
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await crud.login(email, password);
        return user;
      } catch (error) {
        console.error("error_fetching_user", error);
        throw error;
      }
    },
  },
};
