import { gql } from '../config/deps.ts';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Dino {
    id: ID!
    name: String!
    description: String!
  }

  type Query {
    hello: String
    getUsers: [User]
    getUser(id: ID!): User
    getDinos: [Dino]
    getDino(id: ID!): Dino
  }

  type Mutation {
    createUser(username: String!, email: String!): User
    updateUser(id: ID!, username: String, email: String): User
    deleteUser(id: ID!): Boolean
    createDino(name: String!, description: String!): Dino
    updateDino(id: ID!, name: String, description: String): Dino
    deleteDino(id: ID!): Boolean
  }
`;
