export const typeDefs = `#graphql

  type NeonResponse {
    now: String
  }

  type Response {
    message: String!
    dburl: String
    neonResponse: [NeonResponse]
  }

  type Query {
    getDbUrl: Response
  }
`;
