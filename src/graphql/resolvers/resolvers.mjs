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

export const resolvers = {
  Query: {
    books: () => books,
  },
};
