import { Client, load } from '../config/deps.ts';

const env = await load();

// Adatbázis kapcsolat
const client = new Client({
  hostname: env['HOSTNAME'],
  port: env['PORT'],
  user: env['USER'],
  password: env['PASSWORD'],
  database: env['DATABASE'],
});
await client.connect();

export default client;
