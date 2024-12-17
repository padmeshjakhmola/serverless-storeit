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
  Todo: {
    user: async (todo) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${todo.userId}`
      );
      const result = await response.json();
      return result;
    },
  },
  Query: {
    books: () => books,
    users: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.json();
    },
    todos: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return response.json();
    },
    getUser: async (parent, { id }) => {
      const single_user = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      return single_user.json();
    },
    getTodo: async (parent, { id }) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      return response.json();
    },
  },
};
