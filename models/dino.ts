import { Client } from '../config/deps.ts';

interface IDino {
  id?: number;
  name: string;
  description: string;
}

export class Dino {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  async create(dino: IDino): Promise<IDino> {
    const result = await this.client.queryObject<IDino>(
      `INSERT INTO "dinosaurs" (name, description) VALUES ($1, $2) RETURNING *`,
      [dino.name, dino.description]
    );
    return result.rows[0];
  }

  async findById(id: number): Promise<IDino | null> {
    const result = await this.client.queryObject<IDino>(
      `SELECT * FROM "dinosaurs" WHERE id = $1`,
      [id]
    );
    return result.rows.length ? result.rows[0] : null;
  }

  async findAll(): Promise<IDino[]> {
    const result = await this.client.queryObject<IDino>(
      `SELECT * FROM dinosaurs`
    );
    return result.rows;
  }

  async update(id: number, dino: IDino): Promise<IDino> {
    const result = await this.client.queryObject<IDino>(
      `UPDATE "dinosaurs" SET name = $2, description = $3 WHERE id = $1 RETURNING *`,
      [id, dino.name, dino.description]
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<void> {
    await this.client.queryArray(`DELETE FROM "dinosaurs" WHERE id = $1`, [id]);
  }
}

export default Dino;
