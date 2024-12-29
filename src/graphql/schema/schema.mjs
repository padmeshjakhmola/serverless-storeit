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
    password: String!
  }

  type loginUser{
    isPasswordValid: Boolean
    token: String
  }

  type Query {
    getDbUrl: Response
    getUsers: [User]
  }

  type Mutation {
    addUser(name: String, email: String, password: String): [User]
    login(email: String, password: String): loginUser
  }
`;
