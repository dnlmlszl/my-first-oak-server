import { User } from '../models/user.ts';
import { Dino } from '../models/dino.ts';
import client from '../db/index.ts';

const userModel = new User(client);
const dinoModel = new Dino(client);

export const resolvers = {
  Query: {
    hello: () => `Hello World!`,
    getUsers: async () => {
      return await userModel.findAll();
    },
    getUser: async (_: any, { id }: { id: number }) => {
      return await userModel.findById(id);
    },
    getDinos: async () => {
      return await dinoModel.findAll();
    },
    getDino: async (_: any, { id }: { id: number }) => {
      return await dinoModel.findById(id);
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { username, email }: { username: string; email: string }
    ) => {
      return await userModel.create({ username, email });
    },
    updateUser: async (
      _: any,
      { id, username, email }: { id: number; username: string; email: string }
    ) => {
      return await userModel.update(id, { username, email });
    },
    deleteUser: async (_: any, { id }: { id: number }) => {
      await userModel.delete(id);
      return true;
    },
    createDino: async (
      _: any,
      { name, description }: { name: string; description: string }
    ) => {
      return await dinoModel.create({ name, description });
    },
    updateDino: async (
      _: any,
      {
        id,
        name,
        description,
      }: { id: number; name: string; description: string }
    ) => {
      return await dinoModel.update(id, { name, description });
    },
    deleteDino: async (_: any, { id }: { id: number }) => {
      await dinoModel.delete(id);
      return true;
    },
  },
};
