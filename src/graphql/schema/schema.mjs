export const typeDefs = `#graphql

  type NeonResponse {
    now: String
  }

  type Response {
    message: String!
    dburl: String
    neonResponse: [NeonResponse]
  }

  type User {
    id: String!
    name: String!
    email: String!
  }

  type Query {
    getDbUrl: Response
    getUsers: [User]
  }

  type Mutation {
    addUser(name: String, email: String): [User]
    checkUser(email: String): Boolean
  }
`;
