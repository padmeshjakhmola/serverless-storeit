export const typeDefs = `#graphql

  type Book {
    title: String
    author: String
    environment: String
  }

  type Query {
    books: [Book]
  }
`;
