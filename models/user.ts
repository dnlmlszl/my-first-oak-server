import { Client } from '../config/deps.ts';

interface IUser {
  id?: number;
  username: string;
  email: string;
}

export class User {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  async create(user: IUser): Promise<IUser> {
    const result = await this.client.queryObject<IUser>(
      `INSERT INTO "users" (username, email) VALUES ($1, $2) RETURNING *`,
      [user.username, user.email]
    );
    return result.rows[0];
  }

  async findById(id: number): Promise<IUser | null> {
    const result = await this.client.queryObject<IUser>(
      `SELECT * FROM "users" WHERE id = $1`,
      [id]
    );
    return result.rows.length ? result.rows[0] : null;
  }

  async findAll(): Promise<IUser[]> {
    const result = await this.client.queryObject<IUser>(`SELECT * FROM users`);
    return result.rows;
  }

  async update(id: number, user: IUser): Promise<IUser> {
    const result = await this.client.queryObject<IUser>(
      `UPDATE "users" SET username = $2, email = $3 WHERE id = $1 RETURNING *`,
      [id, user.username, user.email]
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<void> {
    await this.client.queryArray(`DELETE FROM "users" WHERE id = $1`, [id]);
  }
}
