import {
  Context,
  verify,
  ApolloServer,
  startStandaloneServer,
} from './config/deps.ts';
import client from './db/index.ts';
import { typeDefs } from './schema/index.ts';
import { resolvers } from './resolvers/index.ts';

// JWT titkosító kulcs (env fájlból vagy más biztonságos helyről)
const SECRET_KEY = 'jkhjkbjhd¶wq«';

// Apollo Server beállítása
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: async (ctx: Context) => {
  //   const auth = ctx.request.headers.get('authorization');
  //   let currentUser = null;

  //   if (auth && auth.startsWith('Bearer ')) {
  //     const token = auth.substring(7);
  //     try {
  //       const decodedToken = await verify(token, SECRET_KEY);
  //       // Itt állítsd be a currentUser-t a felhasználó adataival
  //     } catch (error) {
  //       console.error('Hiba az autentikáció során', error);
  //     }
  //   }

  //   return { currentUser, db: client };
  // },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8000 },
});

console.log(`Server running on: ${url}`);
