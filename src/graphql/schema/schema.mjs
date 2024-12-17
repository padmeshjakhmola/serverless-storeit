export const typeDefs = `#graphql

  type Book {
    title: String
    author: String
    environment: String
  }

  type User {
    id: ID
    name: String
    email: String!
    username: String!
    phone: String!
    website: String!
  }

  type Todo {
    id: ID!
    title: String!
    completed: String!
    userId: String
    user: User
  }

  type Query {
    books: [Book]
    getUser(id: ID!):User
    users: [User!]
    todos: [Todo!]
    getTodo(id: ID!): Todo
  }
`;
